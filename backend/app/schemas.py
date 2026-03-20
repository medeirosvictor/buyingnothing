from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# ========== USER ==========
class UserBase(BaseModel):
    email: str
    username: str
    full_name: Optional[str] = None
    neighborhood: Optional[str] = None
    phone: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class UserSimple(BaseModel):
    id: int
    username: str
    full_name: Optional[str] = None

    class Config:
        from_attributes = True


# ========== ITEM ==========
class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    condition: Optional[str] = None
    neighborhood: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    image_url: Optional[str] = None


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    condition: Optional[str] = None
    neighborhood: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    image_url: Optional[str] = None
    status: Optional[str] = None


class ItemResponse(ItemBase):
    id: int
    status: str
    donor_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ItemWithDonor(ItemResponse):
    donor: UserSimple


# ========== DONATION ==========
class DonationBase(BaseModel):
    message: Optional[str] = None


class DonationCreate(DonationBase):
    item_id: int


class DonationUpdate(BaseModel):
    message: Optional[str] = None
    completed_at: Optional[datetime] = None


class DonationResponse(DonationBase):
    id: int
    item_id: int
    donor_id: int
    recipient_id: int
    completed_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True


class DonationWithDetails(DonationResponse):
    item: ItemResponse
    donor: UserSimple
    recipient: UserSimple

    class Config:
        from_attributes = True
