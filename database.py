import os
from datetime import datetime, timezone

import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, DateTime, text
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# Pobranie URI dla obu baz danych ze zmiennych środowiskowych
DATABASE_URI_COMPANY = os.getenv('DATABASE_URI_COMPANY')
DATABASE_URI_EXCEL = os.getenv('DATABASE_URI_EXCEL')

# Sprawdzenie, czy zmienne środowiskowe są ustawione
if not DATABASE_URI_COMPANY:
    raise ValueError(
        "No DATABASE_URI_COMPANY set for Flask application. Did you forget to set the environment variable?")

if not DATABASE_URI_EXCEL:
    raise ValueError("No DATABASE_URI_EXCEL set for Flask application. Did you forget to set the environment variable?")

# Utworzenie silników bazy danych
engine_company = create_engine(DATABASE_URI_COMPANY)
engine_excel = create_engine(DATABASE_URI_EXCEL)

Base = declarative_base()


# Definicja tabeli dla danych profilu firmy
class CompanyProfile(Base):
    __tablename__ = 'company_profiles'

    id = Column(Integer, primary_key=True)
    company_name = Column(String, nullable=False)
    company_nip = Column(String, nullable=False)
    business_type = Column(String, nullable=False)
    additional_option = Column(String, nullable=True)
    reporting_period = Column(Integer, nullable=False)
    employee_count = Column(Integer, nullable=False)
    annual_revenue = Column(Float, nullable=False)
    usable_area = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))

    # Relacje z innymi tabelami
    stationary_emissions = relationship("StationaryEmission", back_populates="company_profile")
    mobile_emissions = relationship("MobileEmission", back_populates="company_profile")
    electricity_emissions = relationship("ElectricityEmission", back_populates="company_profile")
    heat_emissions = relationship("HeatEmission", back_populates="company_profile")


# Definicja tabeli dla stacjonarnych źródeł emisji
class StationaryEmission(Base):
    __tablename__ = 'stationary_emissions'

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('company_profiles.id'), nullable=False)
    fuel_type = Column(String, nullable=False)
    consumption = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    company_profile = relationship("CompanyProfile", back_populates="stationary_emissions")


# Definicja tabeli dla mobilnych źródeł emisji
class MobileEmission(Base):
    __tablename__ = 'mobile_emissions'

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('company_profiles.id'), nullable=False)
    vehicle_type = Column(String, nullable=False)
    fuel_type = Column(String, nullable=False)
    fuel_consumption = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    vehicle_count = Column(Integer, nullable=False)
    fuel_submission_method = Column(String)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    company_profile = relationship("CompanyProfile", back_populates="mobile_emissions")


# Definicja tabeli dla emisji z energii elektrycznej
class ElectricityEmission(Base):
    __tablename__ = 'electricity_emissions'

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('company_profiles.id'), nullable=False)
    energy_source = Column(String, nullable=False)
    supplier = Column(String, nullable=False)
    consumption = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    ladowanie_samochodow = Column(String)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))

    company_profile = relationship("CompanyProfile", back_populates="electricity_emissions")


# Definicja tabeli dla emisji z energii cieplnej
class HeatEmission(Base):
    __tablename__ = 'heat_emissions'

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('company_profiles.id'), nullable=False)
    supplier = Column(String, nullable=False)
    consumption = Column(Float, nullable=False)
    unit = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))

    company_profile = relationship("CompanyProfile", back_populates="heat_emissions")


# Funkcja tworząca tabele
def create_tables():
    Base.metadata.create_all(engine_company)
    print("Tabele zostały utworzone.")


# Funkcja tworząca sesję
def get_session(engine):
    Session = sessionmaker(bind=engine)
    return Session()


# Funkcja do załadowania danych z Excela
def load_excel_data():
    excel_path = 'xls/ghg2023update.en.pl.xlsx'
    df = pd.read_excel(excel_path, sheet_name=1)
    print("DataFrame loaded from Excel:")
    print(df.head())

    table_name = 'excel_data'
    df.to_sql(table_name, con=engine_excel, index=False, if_exists='replace')
    print(f"Table '{table_name}' created/replaced and data inserted.")

    with engine_excel.connect() as connection:
        result = connection.execute(text(f"SELECT COUNT(*) FROM {table_name}"))
        row_count = result.scalar()
        print(f"Liczba wierszy zaimportowanych do tabeli '{table_name}': {row_count}")
