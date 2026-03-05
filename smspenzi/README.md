# SMS Penzi - Dating Service via SMS

SMS Penzi is a mobile dating platform that operates entirely through SMS/USSD. Users can register, create dating profiles, search for matches, and connect with potential partners - all without internet access.

## How It Works

Registration- Users SMS `START#name#age#gender#county#town` to 22141
Profile Completion- Add education, profession, marital status, religion, ethnicity
Bio/Description- Add a brief description of yourself
Matching- Search by age range and location with `MATCH#[age]#[county]`
Browsing- Receive 3 matches at a time, send `NEXT` for more
Connection- SMS a member's number to request their details

## Getting Started

1. Clone the repository
2. Create virtual environment: `python -m venv venv`
3. Install dependencies: `pip install -r requirements.txt`
4. Configure database in `dbConfig.py`
5. Run: `python main.py`

