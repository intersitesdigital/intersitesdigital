# API Documentation

Base URL: `https://api.intersitesdigital.in/api` (production)  
Base URL: `http://localhost:5000/api` (development)

## Contact API

### POST /contact
Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Example Corp",
  "message": "I'm interested in your services..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll get back to you within 24 hours.",
  "data": {
    "id": "507f1f77bcf86cd799439011"
  }
}
```

**Rate Limit:** 5 requests per 15 minutes

---

## Leads API

### POST /leads
Capture a lead.

**Request Body:**
```json
{
  "email": "lead@example.com",
  "source": "website",
  "metadata": {
    "page": "/services",
    "campaign": "summer2024"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead captured successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011"
  }
}
```

---

## Newsletter API

### POST /newsletter/subscribe
Subscribe to newsletter.

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to our newsletter"
}
```

### POST /newsletter/unsubscribe
Unsubscribe from newsletter.

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from our newsletter"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Status Codes:**
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error
