# Security Spec: Joyouth Organization

## Data Invariants
1. Volunteers and ContactMessages can be created by anonymous users (unless auth is strictly required, but for an NGO form it usually isn't. Let's assume standard auth isn't needed to *submit* a public form, but we will protect read operations. Actually, "Verified Users: For all standard write operations (unless the app explicitly supports anonymous users), you MUST strictly mandate that the user is verified using request.auth.token.email_verified == true." Wait, this is a public form! "unless the app explicitly supports anonymous users". The forms are currently public. Thus, we will allow anonymous creation, but restrict read/list/update/delete to Admins only.)
2. `admins` collection contains verified admin UIDs and their emails.
3. Access to `/volunteers` and `/messages` for list/get/delete operations is strictly limited to authenticated users whose `request.auth.uid` exists in `/admins/{uid}`.
4. Payload size constraints: strings must be < 500 chars, message/motivation < 2000 chars. Arrays must have max 10 elements.

## The "Dirty Dozen" Payloads
1. Unauthorized Admin Creation (Ghost Field: role='admin')
2. Anonymous User Listing Volunteers
3. Spoofed Admin ID Read
4. Excessive Payload Size (Motivation string > 2000 chars)
5. Missing Required Fields (Submitting Volunteer without email)
6. Invalid Type Injection (Submitting array instead of string for name)
7. ID Poisoning (Creating doc with ID of length 2000)
8. Array Override Attack (Submitting nested array for availability)
9. Tampering with Admin Table via Client
10. Unauthenticated Delete of Message
11. Update Gap on Message (Adding an arbitrary field to message after creation)
12. Denial of Wallet via massive array.

## The Test Runner
- We will write `firestore.rules.test.ts` to assert `firebase/rules-unit-testing` logic for the Dirty Dozen.
