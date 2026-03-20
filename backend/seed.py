#!/usr/bin/env python3
"""Seed the database with sample data for local development."""

import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import engine, SessionLocal, Base
from app.models import User, Item, ItemStatus


def seed():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    # --- Users ---
    users = [
        User(
            email="ana@example.com",
            username="ana_verde",
            hashed_password="placeholder",
            full_name="Ana Oliveira",
            neighborhood="Meireles",
            phone="(85) 99999-0001",
        ),
        User(
            email="lucas@example.com",
            username="lucas_ce",
            hashed_password="placeholder",
            full_name="Lucas Souza",
            neighborhood="Aldeota",
            phone="(85) 99999-0002",
        ),
        User(
            email="maria@example.com",
            username="maria_sol",
            hashed_password="placeholder",
            full_name="Maria Costa",
            neighborhood="Benfica",
            phone="(85) 99999-0003",
        ),
    ]
    db.add_all(users)
    db.flush()

    # --- Items ---
    items = [
        Item(
            title="Estante de madeira",
            description="Estante de 5 prateleiras em bom estado. Pequenos arranhões na lateral.",
            category="furniture",
            condition="good",
            neighborhood="Meireles",
            latitude=-3.7240,
            longitude=-38.5125,
            status=ItemStatus.AVAILABLE,
            donor_id=users[0].id,
        ),
        Item(
            title="Coleção de livros infantis",
            description="12 livros infantis variados, idade 3-8 anos. Alguns com marcas de uso.",
            category="books",
            condition="fair",
            neighborhood="Aldeota",
            latitude=-3.7305,
            longitude=-38.5217,
            status=ItemStatus.AVAILABLE,
            donor_id=users[1].id,
        ),
        Item(
            title="Ventilador de mesa",
            description="Ventilador Mondial 30cm, funcionando perfeitamente. 3 velocidades.",
            category="electronics",
            condition="good",
            neighborhood="Benfica",
            latitude=-3.7405,
            longitude=-38.5390,
            status=ItemStatus.AVAILABLE,
            donor_id=users[2].id,
        ),
        Item(
            title="Roupas de bebê (0-6 meses)",
            description="Kit com 15 peças: bodies, macacões e meias. Bem conservadas.",
            category="clothing",
            condition="like_new",
            neighborhood="Varjota",
            latitude=-3.7280,
            longitude=-38.5140,
            status=ItemStatus.AVAILABLE,
            donor_id=users[0].id,
        ),
        Item(
            title="Panelas de aço inox (jogo)",
            description="Jogo com 4 panelas + 1 frigideira. Marcas de uso normal.",
            category="household",
            condition="used",
            neighborhood="Fátima",
            latitude=-3.7370,
            longitude=-38.5310,
            status=ItemStatus.AVAILABLE,
            donor_id=users[1].id,
        ),
    ]
    db.add_all(items)
    db.commit()
    db.close()

    print(f"Seeded {len(users)} users and {len(items)} items.")


if __name__ == "__main__":
    seed()
