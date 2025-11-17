# Admin Setup Instructions

## Access Admin Panel

Your admin system is now ready! Here's how to set it up:

### Step 1: Create Admin User in Supabase

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Navigate to **Authentication → Users**
3. Click **Create new user**
4. Fill in:
   - Email: `admin@renewray.in`
   - Password: `renewray123`
   - Auto confirm user: **Enable this option**
5. Click **Create user**

### Step 2: Add Admin Entry to Database

After creating the auth user, you'll get the user ID. Then:

1. Go to **SQL Editor** in Supabase Dashboard
2. Run this query (replace `YOUR_USER_ID` with the actual user ID from step 1):

```sql
INSERT INTO admin_users (id, email, name, password_hash, is_active)
VALUES (
  'e262cead-a681-462f-954f-a6bedd1e1368   ',
  'admin@renewray.in',
  'Admin',
  'dummy_hash',
  true
);
```

### Step 3: Login to Admin Panel

1. Visit: `http://localhost:5173/admin/login` (local) or your deployed URL + `/admin/login`
2. Enter credentials:
   - Email: `admin@renewray.in`
   - Password: `renewray123`
3. Click **Sign In**

### Step 4: Add Completed Projects

Once logged in:

1. Click **Add Project** button
2. Fill in project details:
   - **Project Title**: e.g., "Residential Villa, Kota"
   - **Project Type**: Select from Residential, Commercial, or Industrial
   - **Capacity (kW)**: e.g., 5
   - **Annual Savings (₹)**: e.g., 45000
   - **Location**: e.g., "Kota, Rajasthan"
   - **Image URL**: (Optional) Pexels image URL
   - **Description**: (Optional) Project details
3. Click **Add Project**

### Step 5: View Projects on Homepage

All projects added through the admin panel automatically appear in the "Completed Projects" section on the homepage!

---

## Admin Panel Features

✅ **Add Projects** - Create new completed projects
✅ **View All Projects** - See all projects in a grid layout
✅ **Delete Projects** - Remove projects from the system
✅ **Logout** - Secure logout functionality

## Project Details Displayed

When you add a project, visitors see:

- Project title and location
- System capacity (kW)
- Annual savings (₹)
- Project type badge
- Beautiful image cards with smooth hover effects

## Database Schema

### admin_users table

- id (UUID) - User identifier
- email - Admin email
- name - Admin name
- password_hash - For reference (Supabase handles auth)
- is_active - Status flag
- created_at - Creation timestamp

### projects table

- id - Project ID
- title - Project name
- capacity_kw - System size
- annual_savings - Yearly savings amount
- location - Project location
- image_url - Project image
- project_type - Type (residential/commercial/industrial)
- created_by - Admin who created it
- created_at/updated_at - Timestamps

---

## Demo Credentials (After Setup)

```
Email: admin@renewray.in
Password: renewray123
```

---

## Troubleshooting

**Issue: "Not authorized as admin" on login**

- Make sure you added the admin user entry to the database using the SQL query above

**Issue: Projects not showing on homepage**

- Make sure you added at least one project through the admin panel
- Clear browser cache and refresh the page

**Issue: Can't login**

- Verify email and password are correct
- Check that the Supabase auth user was created with "Auto confirm" enabled
- Check browser console for error messages

---

## Next Steps

1. Complete the Supabase setup steps above
2. Login to admin panel
3. Add your completed projects
4. They'll automatically appear on the homepage!

For any issues, check the browser console (F12) for error messages.
