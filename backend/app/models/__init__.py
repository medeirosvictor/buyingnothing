from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
import enum


class ItemStatus(str, enum.Enum):
    AVAILABLE = "available"
    PENDING = "pending"
    COMPLETED = "completed"


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    location = Column(String)  # neighborhood/area
    phone = Column(String)  # optional contact
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Items this user has posted for donation
    items = relationship("Item", back_populates="donor", foreign_keys="Item.donor_id")
    # Donations where this user is the recipient
    received_donations = relationship("Donation", back_populates="recipient", foreign_keys="Donation.recipient_id")


class Item(Base):
    __tablename__ = "items"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)  # clothing, furniture, electronics, etc.
    condition = Column(String)  # new, good, fair
    location = Column(String)  # pickup location/neighborhood
    status = Column(String, default=ItemStatus.AVAILABLE)
    donor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    donor = relationship("User", back_populates="items", foreign_keys=[donor_id])
    donation = relationship("Donation", back_populates="item", uselist=False)


class Donation(Base):
    __tablename__ = "donations"
    
    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.id"), nullable=False, unique=True)
    donor_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # copied from item for query convenience
    recipient_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    message = Column(Text)  # message from recipient to donor
    completed_at = Column(DateTime)  # when the exchange happened
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships - 3 foreign keys total:
    # 1. item_id -> items.id
    # 2. donor_id -> users.id  
    # 3. recipient_id -> users.id
    item = relationship("Item", back_populates="donation")
    donor = relationship("User", foreign_keys=[donor_id])
    recipient = relationship("User", back_populates="received_donations", foreign_keys=[recipient_id])
