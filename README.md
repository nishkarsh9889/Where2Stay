# Where2Stay

**Where2Stay** is a full-stack hotel booking application that provides users with an easy and seamless way to search for hotels, book rooms, and manage bookings. The application also includes an admin panel for managing rooms and bookings efficiently.

## Live Project Link : https://where-2-stay.vercel.app

## Features

### User Features:
- **User Registration & Login**:  
  Secure user authentication with JWT tokens.
- **Search Functionality**:  
  Search for hotels by type (e.g., Cabana, Penthouse, Standard) and date availability.
- **Room Details**:  
  View all types of rooms along with description and price details.
- **Booking**:  
  Add the number of adults and children, confirm the booking, and proceed to payment via Stripe.
- **Find My Booking**:  
  Search for bookings using a unique booking confirmation code.
- **Profile Management**:  
  View personal profile details.

### Admin Features:
- **Room Management**:  
  Add, delete, update, or modify room details.
- **Booking Management**:  
  View and archive bookings.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Spring Boot
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)
- **Payment Integration**: Stripe

---

## Installation & Setup

### Prerequisites:
- Node.js installed
- Java JDK installed
- PostgreSQL database setup
- Stripe account for payment integration

### Steps to Run the Application:

#### Backend (Spring Boot):
1. Clone the repository and navigate to the backend directory.
2. Configure the `application.properties` file with your PostgreSQL database credentials and Stripe API keys.
3. Build and run the backend using:
   ```bash
   ./mvnw spring-boot:run

#### Frontend (React.js):
1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
    npm install
3. Start the React development server:
   ```bash
    npm start

---

## Usage

### User Flow:

1. Register or login to the application.
2. Use the search feature to find hotels or browse all available rooms.
3. Select a room, add guest details, and confirm booking.
4. Complete payment securely via Stripe.
5. Use the "Find My Booking" feature to retrieve booking details with the confirmation code.
6. Manage profile details via the "My Profile" section.

### Admin Flow:

1. Access the admin dashboard to manage rooms and bookings.
2. Add, update, delete, or modify room details.
3. Archive or manage bookings as required.

---

## Future Enhancements

- **Add reviews and ratings for hotels.**
- **Implement a more advanced search with filters like price range and amenities.**
- **Include email notifications for booking confirmations.**
- **Add multi-language support for better user experience.**

---

## License
This project is licensed under the MIT License.
Feel free to contribute to this project or raise issues for improvements! 😊
   
