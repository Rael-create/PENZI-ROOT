# Use official Python 3.9 slim image (lightweight)
FROM python:3.9-slim

# Set working directory inside container
WORKDIR /app

# Copy only requirements first (caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose port Flask will run on
EXPOSE 5000

# Install Gunicorn
RUN pip install gunicorn

# Start Gunicorn to serve Flask app in production
# 4 workers for multi-processing
# Bind to all interfaces
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:5000", "main:app"]