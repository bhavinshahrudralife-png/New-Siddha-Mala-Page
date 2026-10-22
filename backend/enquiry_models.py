import re
from datetime import datetime, timezone
from typing import Literal
import uuid
import phonenumbers
from pydantic import BaseModel, Field, EmailStr, ConfigDict, model_validator

class EnquiryCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    country: str = Field(pattern=r'^[A-Z]{2}$')
    country_code: str = Field(pattern=r'^\+\d{1,4}$')
    city: str = Field(default='', max_length=150)
    company: str = Field(default='', max_length=150)
    profession: str = Field(default='', max_length=150)
    message: str = Field(default='', max_length=4000)
    source: Literal['inline', 'popup'] = 'inline'
    interest: str = Field(default='', max_length=200)
    submission_id: str = Field(default_factory=lambda: str(uuid.uuid4()), pattern=r'^[a-zA-Z0-9-]{12,80}$')

    @model_validator(mode='after')
    def validate_phone(self):
        if self.country not in phonenumbers.SUPPORTED_REGIONS:
            raise ValueError('Please select a valid country.')
        if self.country_code != '+' + str(phonenumbers.country_code_for_region(self.country)):
            raise ValueError('Phone country and dialling code do not match.')
        try:
            number = phonenumbers.parse(self.phone, self.country)
        except phonenumbers.NumberParseException:
            raise ValueError('Please enter a valid phone number.')
        if not phonenumbers.is_valid_number_for_region(number, self.country):
            raise ValueError('Please enter a valid phone number for the selected country.')
        self.phone = phonenumbers.format_number(number, phonenumbers.PhoneNumberFormat.E164)
        return self

class Enquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    country: str = ''
    country_code: str = ''
    city: str = ''
    company: str = ''
    profession: str = ''
    message: str = ''
    source: str = 'legacy'
    interest: str = ''
    status: str = 'new'
    notes: str = ''
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class LeadUpdate(BaseModel):
    status: Literal['new', 'contacted', 'qualified', 'closed']
    notes: str = Field(default='', max_length=5000)

class LeadPage(BaseModel):
    items: list[Enquiry]
    total: int
    page: int
    has_more: bool