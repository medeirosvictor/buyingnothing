from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from contextlib import asynccontextmanager

from app.database import engine, Base, get_db
from app.models import User, Item, Donation, ItemStatus
from app.schemas import (
    UserCreate, UserResponse, UserSimple,
    ItemCreate, ItemUpdate, ItemResponse, ItemWithDonor,
    DonationCreate, DonationResponse, DonationWithDetails
)


# Create tables on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Buy Nothing API",
    description="API for a local donation exchange platform",
    version="0.1.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Buy Nothing API", "version": "0.1.0"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


# ========== USER ROUTES ==========
@app.post("/users/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if email exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if username exists
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # TODO: Implement proper password hashing
    db_user = User(
        email=user.email,
        username=user.username,
        hashed_password=user.password,
        full_name=user.full_name,
        location=user.location,
        phone=user.phone
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get("/users/", response_model=list[UserResponse])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(User).offset(skip).limit(limit).all()
    return users


@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# ========== ITEM ROUTES ==========
@app.post("/items/", response_model=ItemResponse)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    # TODO: Get actual user from auth
    donor_id = 1  # Placeholder - should come from authenticated user
    
    db_item = Item(
        title=item.title,
        description=item.description,
        category=item.category,
        condition=item.condition,
        location=item.location,
        donor_id=donor_id
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.get("/items/", response_model=list[ItemWithDonor])
def list_items(
    status: str = ItemStatus.AVAILABLE,
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    items = db.query(Item).filter(Item.status == status).offset(skip).limit(limit).all()
    return items


@app.get("/items/{item_id}", response_model=ItemWithDonor)
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.put("/items/{item_id}", response_model=ItemResponse)
def update_item(item_id: int, item_update: ItemUpdate, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    update_data = item_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)
    
    db.commit()
    db.refresh(item)
    return item


# ========== DONATION ROUTES ==========
@app.post("/donations/", response_model=DonationResponse)
def create_donation(donation: DonationCreate, db: Session = Depends(get_db)):
    # TODO: Get actual user from auth
    recipient_id = 1  # Placeholder - should come from authenticated user
    
    # Get the item
    item = db.query(Item).filter(Item.id == donation.item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    if item.status != ItemStatus.AVAILABLE:
        raise HTTPException(status_code=400, detail="Item is not available")
    
    # Prevent donor from claiming their own item
    if item.donor_id == recipient_id:
        raise HTTPException(status_code=400, detail="Cannot claim your own item")
    
    # Mark item as pending
    item.status = ItemStatus.PENDING
    
    db_donation = Donation(
        item_id=donation.item_id,
        donor_id=item.donor_id,
        recipient_id=recipient_id,
        message=donation.message
    )
    db.add(db_donation)
    db.commit()
    db.refresh(db_donation)
    return db_donation


@app.get("/donations/", response_model=list[DonationWithDetails])
def list_donations(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    donations = db.query(Donation).offset(skip).limit(limit).all()
    return donations


@app.get("/donations/{donation_id}", response_model=DonationWithDetails)
def get_donation(donation_id: int, db: Session = Depends(get_db)):
    donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    return donation


@app.post("/donations/{donation_id}/complete", response_model=DonationResponse)
def complete_donation(donation_id: int, db: Session = Depends(get_db)):
    from datetime import datetime
    
    donation = db.query(Donation).filter(Donation.id == donation_id).first()
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    # Mark donation as completed
    donation.completed_at = datetime.utcnow()
    
    # Mark item as completed
    donation.item.status = ItemStatus.COMPLETED
    
    db.commit()
    db.refresh(donation)
    return donation


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
