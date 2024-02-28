# IC-food-app-milestone-1



# Food Ordering System

This is a Food Ordering System project that allows users to browse, filter, and order food items. Users can register and log in using their Gmail or Facebook accounts. The system categorizes food items into veg, non-veg, and dessert for easy browsing. Below are the implemented features:

### User Registration and Authentication:
- Users can register and authenticate using their Gmail or Facebook accounts.
- User details from Gmail/Facebook accounts are stored in the database.
- Roles such as admin, superuser, and user are included in the User collection.

### Schema Design:
1. **User Collection:**
   - Store user details from Gmail accounts.
2. **Food Collection:**
   - Includes fields like food name, description, price, and image.
3. **Order Collection:**
   - Includes fields like food Id, user Id, order Id, created At, updated At, and status.
   - Categorizes food into veg, non-veg, dessert.

### Project Based on Categories:
- Display a user-friendly list of available food items with names, descriptions, prices, and images.
- Implemented filters for veg, non-veg, and dessert.
- Enable efficient search by creating an index on the food name field.
- Implement auto-recommendations based on entered letters.

### Order Placement:
- Users can order food, capturing user ID, food ID, date and time, user address ID, and payment mode (cash, card, UPI).
- Node-Cron is implemented to cancel orders if OTP confirmation is not completed within 20 minutes.

### Folder Structure:
```
.
├── controllers
│   ├── authController.js
│   ├── foodController.js
│   └── orderController.js
├── models
│   ├── food.js
│   ├── order.js
│   └── user.js
├── routes
│   ├── authRoutes.js
│   ├── foodRoutes.js
│   └── orderRoutes.js
└── utils
    ├── cronJobs.js
    └── chartUtils.js
```

### Usage:
- Register/Login with Gmail or Facebook accounts.
- Browse available food items by category.
- Search for specific items using the search bar.
- Filter items by veg, non-veg, or dessert.
- Place orders with the desired items and payment method.
- View order history and status.

### Future Implementations:
1. Feedback and File Uploads:
   - Implement feedback (rating from 1 to 5) with image upload.
   - Support uploading a text file, extract data from the file, and store it in the Order collection.
   
2. Display Orders and OTP Verification:
   - Display orders based on the user with respective statuses.
   - Send OTP to the user's email for verification of order delivery.
   - Send OTP to the user's mobile number for verification of order delivery.
   
3. Social Media Integration:
   - Integrate the Social Media Graph API from Facebook to share reviews on Facebook.
   
4. Payment Gateway Integration:
   - Implement a payment gateway for test users.
   - Store invoice ID, user information, and payment details in the Order collection upon successful payment.


