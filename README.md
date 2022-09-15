# OTP-Generator
<!-- GETTING STARTED -->
## Getting Started

To get started with this project make a folder. Open the folder in your terminal. And...

### Prerequisites

For this project you should have npm installed on your device. For npm go to this [Link][Node.com]

### Cloning the project

1. Clone the repo
   ```sh
   git clone https://github.com/MeetShoaibKhan/OTP-Generator.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<hr/>

[Node.com]: https://nodejs.org/en/download/

<!-- USAGE EXAMPLES  -->
## Usage

You can use the folowing routes:

- `POST: http://localhost:1234/users` `body: { "name": "Any name", "phoneNumber": "03409439034"}`- This will create user in User tables. </br>
- `POST: http://localhost:1234/users/generateOTP` `body: { "phone_number": "03409439034"}`  - This will generate a random 4 digit numeric OTP if user phone number exists in the user table. It will save the OTP in users table, setting expiration date to 5 minutes in future and returns user id in response. </br>
- `GET: http://localhost:1234/users/:user_id/verifyOTP?otp=3490` - This will check if `otp_expiration_date` < current date and time. It will confirm if otp is correct and sends user object in response. If otp is incorrect, it will send error status. </br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
