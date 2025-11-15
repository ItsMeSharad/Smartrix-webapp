/**
 * SmartTix - Ticket Booking Web App
 * 
 * This is a client-side only implementation of a ticket booking system
 * with features like event listing, booking, wallet management, and AI assistant.
 */

// ==================== FEATURE FLAGS / THEME ====================
const FEATURE_FLAGS = {
    themeToggle: true,
    aiAssistant: true,
    wallet: true,
    refundsEnabled: true,
    selfieVerification: true,
    verificationAdmin: true,
    categoryFilter: true
};

let activeCategory = 'all';

// Ticket banner images by category
const TICKET_IMAGES = {
    movie: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80',
    concert: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    workshop: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80'
};

// ==================== DATA MODELS ====================

/**
 * Sample event data
 * In a real application, this would come from a backend API
 */
const events = [
    {
        id: 'evt001',
        title: 'Mumbai Express',
        city: 'Mumbai',
        venue: 'Chhatrapati Shivaji Terminus, Mumbai',
        datetime: '2023-11-15T13:30:00',
        base_price: 500,
        service_fee: 75,
        tax: 25,
        seats_available: 120,
        category: 'movie',
        image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        id: 'evt002',
        title: 'Avengers: Endgame',
        city: 'Delhi',
        venue: 'PVR Cinemas, Saket, Delhi',
        datetime: '2023-11-21T18:00:00',
        base_price: 350,
        service_fee: 53,
        tax: 17,
        seats_available: 80,
        category: 'movie',
        image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        id: 'evt003',
        title: 'Rock Night Live',
        city: 'Lucknow',
        venue: 'KD Singh Stadium, Lucknow',
        datetime: '2023-11-26T19:30:00',
        base_price: 1200,
        service_fee: 180,
        tax: 60,
        seats_available: 500,
        category: 'concert',
        image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        id: 'evt004',
        title: 'Web Development Workshop',
        city: 'Bangalore',
        venue: 'Tech Hub, Koramangala, Bangalore',
        datetime: '2023-12-01T09:30:00',
        base_price: 800,
        service_fee: 120,
        tax: 40,
        seats_available: 30,
        category: 'workshop',
        image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        id: 'evt005',
        title: 'Jazz Night',
        city: 'Mumbai',
        venue: 'Blue Frog, Mumbai',
        datetime: '2023-11-18T20:30:00',
        base_price: 750,
        service_fee: 113,
        tax: 37,
        seats_available: 100,
        category: 'concert',
        image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        id: 'evt006',
        title: 'Classical Music Evening',
        city: 'Chennai',
        venue: 'Music Academy, Chennai',
        datetime: '2023-11-23T18:00:00',
        base_price: 600,
        service_fee: 90,
        tax: 30,
        seats_available: 200,
        category: 'concert',
        image_url: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        id: 'evt007',
        title: 'Kolkata Film Festival',
        city: 'Kolkata',
        venue: 'Nandan Complex, Kolkata',
        datetime: '2025-12-05T17:00:00',
        base_price: 400,
        service_fee: 60,
        tax: 20,
        seats_available: 150,
        category: 'movie',
        image_url: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'evt008',
        title: 'Jaipur Literature Fest',
        city: 'Jaipur',
        venue: 'Diggi Palace, Jaipur',
        datetime: '2026-01-24T10:00:00',
        base_price: 300,
        service_fee: 45,
        tax: 15,
        seats_available: 300,
        category: 'workshop',
        image_url: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'evt009',
        title: 'Hyderabad Tech Meetup',
        city: 'Hyderabad',
        venue: 'HITEC City Auditorium, Hyderabad',
        datetime: '2025-12-12T14:00:00',
        base_price: 500,
        service_fee: 75,
        tax: 25,
        seats_available: 200,
        category: 'workshop',
        image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'evt010',
        title: 'Pune Jazz Night',
        city: 'Pune',
        venue: 'Shaniwar Wada Grounds, Pune',
        datetime: '2025-12-20T20:00:00',
        base_price: 700,
        service_fee: 105,
        tax: 35,
        seats_available: 180,
        category: 'concert',
        image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80'
    },
    {
        id: 'evt011',
        title: 'Ahmedabad Garba Night',
        city: 'Ahmedabad',
        venue: 'GMDC Ground, Ahmedabad',
        datetime: '2025-10-08T19:00:00',
        base_price: 600,
        service_fee: 90,
        tax: 30,
        seats_available: 400,
        category: 'concert',
        image_url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80'
    }
];

/**
 * Sample user data with wallet
 * In a real application, this would be managed by a user authentication system
 */
let userWallet = {
    balance: 1000, // Initial balance ₹1000
    transactions: [
        // Sample transactions for demo
        {
            id: 'txn001',
            type: 'credit',
            amount: 1000,
            description: 'Initial wallet balance',
            timestamp: new Date('2023-11-01T10:00:00').toISOString()
        }
    ]
};

/**
 * Initialize local storage with sample data if not already present
 */
function initializeLocalStorage() {
    // Initialize or merge events
    const existing = localStorage.getItem('smarttix_events');
    if (!existing) {
        localStorage.setItem('smarttix_events', JSON.stringify(events));
    } else {
        try {
            const existingEvents = JSON.parse(existing) || [];
            const existingIds = new Set(existingEvents.map(e => e.id));
            const toAdd = events.filter(e => !existingIds.has(e.id));
            if (toAdd.length) {
                const merged = existingEvents.concat(toAdd);
                localStorage.setItem('smarttix_events', JSON.stringify(merged));
            }
        } catch (e) {
            // If parsing fails, reset to current events dataset
            localStorage.setItem('smarttix_events', JSON.stringify(events));
        }
    }
    
    // Initialize wallet
    if (!localStorage.getItem('smarttix_wallet')) {
        localStorage.setItem('smarttix_wallet', JSON.stringify(userWallet));
    }
    
    // Initialize bookings
    if (!localStorage.getItem('smarttix_bookings')) {
        localStorage.setItem('smarttix_bookings', JSON.stringify([]));
    }
}

/**
 * Get data from local storage
 */
function getLocalData(key) {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * Save data to local storage
 */
function saveLocalData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ==================== UI COMPONENTS ====================

/**
 * Format date for display
 */
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

/**
 * Format currency for display
 */
function formatCurrency(amount) {
    return '₹' + amount.toFixed(2);
}

/**
 * Generate unique ID for transactions and bookings
 */
function generateId(prefix) {
    return prefix + Math.random().toString(36).substr(2, 9);
}

/**
 * Update wallet balance and add transaction
 */
function updateWallet(amount, description, type) {
    if (!FEATURE_FLAGS.wallet) {
        return true; // wallet disabled: treat as no-op success
    }
    const wallet = getLocalData('smarttix_wallet');
    
    if (type === 'debit' && wallet.balance < amount) {
        return false; // Insufficient balance
    }
    
    // Update balance
    if (type === 'debit') {
        wallet.balance -= amount;
    } else {
        wallet.balance += amount;
    }
    
    // Add transaction
    const transaction = {
        id: generateId('txn'),
        type: type,
        amount: amount,
        description: description,
        timestamp: new Date().toISOString()
    };
    
    wallet.transactions.unshift(transaction); // Add to beginning of array
    saveLocalData('smarttix_wallet', wallet);
    updateWalletDisplay();
    return true;
}

/**
 * Generate transaction card HTML
 */
function generateTransactionCard(transaction) {
    return `
        <div class="transaction-card ${transaction.type}">
            <div class="transaction-icon">
                <i class="${transaction.type === 'credit' ? 'fas fa-arrow-down' : 'fas fa-arrow-up'}"></i>
            </div>
            <div class="transaction-details">
                <div class="transaction-title">${transaction.description}</div>
                <div class="transaction-date">${formatDate(transaction.timestamp)}</div>
            </div>
            <div class="transaction-amount ${transaction.type}">
                ${transaction.type === 'credit' ? '+' : '-'} ${formatCurrency(transaction.amount)}
            </div>
        </div>
    `;
}

/**
 * Update wallet display in header
 */
function updateWalletDisplay() {
    const wallet = getLocalData('smarttix_wallet');
    document.querySelector('.wallet-amount').textContent = formatCurrency(wallet.balance);
}

/**
 * Display transactions in the transactions page
 */
function displayTransactions() {
    const transactionsContainer = document.querySelector('.transactions-container');
    const wallet = getLocalData('smarttix_wallet');
    
    if (wallet.transactions.length === 0) {
        transactionsContainer.innerHTML = '<div class="no-transactions">No transactions yet</div>';
        return;
    }
    
    let transactionsHTML = '';
    wallet.transactions.forEach(transaction => {
        transactionsHTML += generateTransactionCard(transaction);
    });
    
    transactionsContainer.innerHTML = transactionsHTML;
}

/**
 * Get event by ID
 */
function getEventById(eventId) {
    const events = getLocalData('smarttix_events');
    return events.find(event => event.id === eventId);
}

/**
 * Get booking by ID
 */
function getBookingById(bookingId) {
    const bookings = getLocalData('smarttix_bookings');
    return bookings.find(booking => booking.id === bookingId);
}

/**
 * Update event data (e.g., seats available)
 */
function updateEvent(eventId, updates) {
    const events = getLocalData('smarttix_events');
    const eventIndex = events.findIndex(event => event.id === eventId);
    
    if (eventIndex !== -1) {
        events[eventIndex] = { ...events[eventIndex], ...updates };
        saveLocalData('smarttix_events', events);
        return true;
    }
    
    return false;
}

/**
 * Create a new booking
 */
function createBooking(eventId, seats) {
    const event = getEventById(eventId);
    if (!event || event.seats_available < seats) {
        return { success: false, message: 'Not enough seats available' };
    }
    
    const totalCost = (event.base_price + event.service_fee + event.tax) * seats;
    
    // Check wallet balance
    const wallet = getLocalData('smarttix_wallet');
    if (wallet.balance < totalCost) {
        return { success: false, message: 'Insufficient wallet balance' };
    }
    
    // Create booking
    const booking = {
        id: generateId('bkg'),
        eventId: event.id,
        eventTitle: event.title,
        eventDateTime: event.datetime,
        eventVenue: event.venue,
        seats: seats,
        totalCost: totalCost,
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
        qrCode: null // Will be generated later
    };
    
    // Update seats available
    updateEvent(eventId, { seats_available: event.seats_available - seats });
    
    // Deduct from wallet
    const walletUpdated = updateWallet(
        totalCost,
        `Booking: ${event.title} (${seats} seat${seats > 1 ? 's' : ''})`,
        'debit'
    );
    
    if (!walletUpdated) {
        return { success: false, message: 'Wallet transaction failed' };
    }
    
    // Save booking
    const bookings = getLocalData('smarttix_bookings');
    bookings.push(booking);
    saveLocalData('smarttix_bookings', bookings);
    
    return { success: true, booking: booking };
}

/**
 * Cancel a booking and refund to wallet
 */
function cancelBooking(bookingId) {
    const bookings = getLocalData('smarttix_bookings');
    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex === -1 || bookings[bookingIndex].status !== 'confirmed') {
        return { success: false, message: 'Booking not found or already refunded' };
    }
    
    const booking = bookings[bookingIndex];
    
    // Update event seats
    const event = getEventById(booking.eventId);
    if (event) {
        updateEvent(booking.eventId, { seats_available: event.seats_available + booking.seats });
    }
    
    // Refund to wallet
    const walletUpdated = updateWallet(
        booking.totalCost,
        `Refund: ${booking.eventTitle} (${booking.seats} seat${booking.seats > 1 ? 's' : ''})`,
        'credit'
    );
    
    if (!walletUpdated) {
        return { success: false, message: 'Wallet transaction failed' };
    }
    
    // Update booking status
    booking.status = 'refunded';
    booking.refundDate = new Date().toISOString();
    booking.refund_type = 'wallet_instant';
    
    bookings[bookingIndex] = booking;
    saveLocalData('smarttix_bookings', bookings);
    
    return { success: true, booking: booking };
}

/**
 * Generate QR code for a booking
 */
function generateQRCode(bookingId) {
    // In a real app, this would generate a proper QR code with booking details
    // For this prototype, we'll use a simple QR code library
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}`;
}

/**
 * Generate ticket card HTML
 */
function generateTicketCard(booking) {
    const event = getEventById(booking.eventId);
    
    return `
        <div class="ticket-card" data-booking-id="${booking.id}">
            <div class="ticket-header">
                <h3>${booking.eventTitle}</h3>
                <div class="ticket-status ${booking.status}">${booking.status}</div>
            </div>
            <div class="ticket-banner">
                <img src="${TICKET_IMAGES[event?.category] || event?.image_url || ''}" alt="${event?.title || 'Event'}">
            </div>
            <div class="ticket-details">
                <div class="ticket-info">
                    <div class="ticket-info-item">
                        <i class="far fa-calendar-alt"></i>
                        <span>${formatDate(booking.eventDateTime)}</span>
                    </div>
                    <div class="ticket-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${booking.eventVenue}</span>
                    </div>
                    <div class="ticket-info-item">
                        <i class="fas fa-chair"></i>
                        <span>${booking.seats} seat${booking.seats > 1 ? 's' : ''}</span>
                    </div>
                    <div class="ticket-info-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>${formatCurrency(booking.totalCost)}</span>
                    </div>
                </div>
                <div class="ticket-qr">
                    <img src="${generateQRCode(booking.id)}" alt="QR Code">
                    <div class="booking-id">${booking.id}</div>
                </div>
            </div>
            <div class="ticket-actions">
                <button class="btn view-ticket-btn" data-booking-id="${booking.id}">View Details</button>
                ${booking.status === 'confirmed' ? `<button class="btn cancel-btn" data-booking-id="${booking.id}">Cancel</button>` : ''}
            </div>
        </div>
    `;
}

/**
 * Display tickets in the tickets page
 */
function displayTickets() {
    const ticketsContainer = document.querySelector('.tickets-container');
    const bookings = getLocalData('smarttix_bookings');
    
    if (bookings.length === 0) {
        ticketsContainer.innerHTML = '<div class="no-tickets">No tickets yet</div>';
        return;
    }
    
    let ticketsHTML = '';
    bookings.forEach(booking => {
        ticketsHTML += generateTicketCard(booking);
    });
    
    ticketsContainer.innerHTML = ticketsHTML;
    
    // Add event listeners to ticket buttons
    document.querySelectorAll('.view-ticket-btn').forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-booking-id');
            openTicketDetailsModal(bookingId);
        });
    });
    
    document.querySelectorAll('.cancel-btn').forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-booking-id');
            if (confirm('Are you sure you want to cancel this booking? The amount will be refunded to your wallet immediately.')) {
                const result = cancelBooking(bookingId);
                if (result.success) {
                    alert('Booking cancelled successfully. Amount refunded to wallet.');
                    displayTickets(); // Refresh tickets display
                } else {
                    alert('Error: ' + result.message);
                }
            }
        });
    });
}

/**
 * Display trending events on the home page
 */
function displayTrendingEvents() {
    const trendingContainer = document.querySelector('.trending-events');
    
    // Check if container exists
    if (!trendingContainer) return;
    
    // Get 3 random events for trending
    const trendingEvents = [...events]
        .filter(event => event.seats_available > 0)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    if (trendingEvents.length === 0) {
        trendingContainer.innerHTML = '<div class="no-events">No trending events</div>';
        return;
    }
    
    let trendingHTML = '';
    trendingEvents.forEach(event => {
        trendingHTML += generateEventCard(event);
    });
    
    trendingContainer.innerHTML = trendingHTML;
    
    // Add event listeners to book buttons
    document.querySelectorAll('.book-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            openBookingModal(eventId);
        });
    });
}

/**
 * Display all events on the events page
 */
function displayEvents() {
    const eventsContainer = document.querySelector('.events-container');
    
    // Check if container exists
    if (!eventsContainer) return;
    
    let eventsHTML = '';
    events.forEach(event => {
        eventsHTML += generateEventCard(event);
    });
    
    eventsContainer.innerHTML = eventsHTML;
    
    // Add event listeners to book buttons
    document.querySelectorAll('.book-btn').forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            openBookingModal(eventId);
        });
    });
}

/**
 * Display transactions on the transactions page
 */
function displayTransactions() {
    const transactionsContainer = document.querySelector('.transactions-container');
    
    // Check if container exists
    if (!transactionsContainer) return;
    
    const wallet = getLocalData('smarttix_wallet');
    
    if (wallet.transactions.length === 0) {
        transactionsContainer.innerHTML = '<div class="no-transactions">No transactions yet</div>';
        return;
    }
    
    let transactionsHTML = '';
    wallet.transactions.forEach(transaction => {
        transactionsHTML += generateTransactionCard(transaction);
    });
    
    transactionsContainer.innerHTML = transactionsHTML;
}

/**
 * Open booking modal for an event
 */
function openBookingModal(eventId) {
    const event = getEventById(eventId);
    if (!event) return;
    
    const modal = document.getElementById('booking-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    const totalPrice = event.base_price + event.service_fee + event.tax;
    
    modalContent.innerHTML = `
        <span class="close-btn">&times;</span>
        <div class="modal-event-image">
            <img src="${event.image_url}" alt="${event.title}">
        </div>
        <div class="modal-event-info">
            <h3>${event.title}</h3>
            <p><i class="far fa-calendar-alt"></i> ${formatDate(event.datetime)}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
            <p><i class="fas fa-chair"></i> ${event.seats_available} seats available</p>
        </div>
        <div class="booking-form">
            <div class="form-group">
                <label for="seats">Number of Seats:</label>
                <input type="number" id="seats" min="1" max="${Math.min(event.seats_available, 10)}" value="1">
            </div>
            <div class="cost-breakdown">
                <div class="cost-item">
                    <span>Base Price (per seat)</span>
                    <span>${formatCurrency(event.base_price)}</span>
                </div>
                <div class="cost-item">
                    <span>Service Fee (per seat)</span>
                    <span>${formatCurrency(event.service_fee)}</span>
                </div>
                <div class="cost-item">
                    <span>Tax (per seat)</span>
                    <span>${formatCurrency(event.tax)}</span>
                </div>
                <div class="cost-item total">
                    <span>Total (for <span id="seat-count">1</span> seat)</span>
                    <span id="total-cost">${formatCurrency(totalPrice)}</span>
                </div>
            </div>
            <div class="wallet-status">
                <span>Wallet Balance:</span>
                <span id="modal-wallet-balance">${formatCurrency(getLocalData('smarttix_wallet').balance)}</span>
            </div>
            <button id="confirm-booking" class="btn primary-btn">Confirm Booking</button>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'flex';
    
    // Close button event
    modalContent.querySelector('.close-btn').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Update cost when seats change
    const seatsInput = document.getElementById('seats');
    seatsInput.addEventListener('input', function() {
        updateCostBreakdown(event, parseInt(this.value));
    });
    
    // Confirm booking button
    document.getElementById('confirm-booking').addEventListener('click', function() {
        const seats = parseInt(seatsInput.value);
        const result = createBooking(event.id, seats);
        
        if (result.success) {
            alert('Booking confirmed! You can view your ticket in the My Tickets section.');
            modal.style.display = 'none';
            
            // If we're on the events page, refresh the display
            if (document.getElementById('events-page').classList.contains('active')) {
                displayEvents();
            }
        } else {
            alert('Error: ' + result.message);
        }
    });
}

/**
 * Update cost breakdown in booking modal
 */
function updateCostBreakdown(event, seats) {
    const totalPrice = (event.base_price + event.service_fee + event.tax) * seats;
    document.getElementById('seat-count').textContent = seats;
    document.getElementById('total-cost').textContent = formatCurrency(totalPrice);
    
    // Check if wallet has enough balance
    const walletBalance = getLocalData('smarttix_wallet').balance;
    const confirmButton = document.getElementById('confirm-booking');
    
    if (walletBalance < totalPrice) {
        confirmButton.disabled = true;
        confirmButton.textContent = 'Insufficient Balance';
    } else {
        confirmButton.disabled = false;
        confirmButton.textContent = 'Confirm Booking';
    }
}

/**
 * Open ticket details modal
 */
function openTicketDetailsModal(bookingId) {
    const booking = getBookingById(bookingId);
    if (!booking) return;
    
    const modal = document.getElementById('ticket-details-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <span class="close-btn">&times;</span>
        <div class="ticket-details-container">
            <div class="ticket-header">
                <h3>${booking.eventTitle}</h3>
                <div class="ticket-status ${booking.status}">${booking.status}</div>
            </div>
            <div class="ticket-info">
                <div class="ticket-info-item">
                    <i class="far fa-calendar-alt"></i>
                    <span>${formatDate(booking.eventDateTime)}</span>
                </div>
                <div class="ticket-info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${booking.eventVenue}</span>
                </div>
                <div class="ticket-info-item">
                    <i class="fas fa-chair"></i>
                    <span>${booking.seats} seat${booking.seats > 1 ? 's' : ''}</span>
                </div>
                <div class="ticket-info-item">
                    <i class="fas fa-money-bill-wave"></i>
                    <span>${formatCurrency(booking.totalCost)}</span>
                </div>
                <div class="ticket-info-item">
                    <i class="fas fa-clock"></i>
                    <span>Booked on: ${formatDate(booking.bookingDate)}</span>
                </div>
                ${booking.status === 'refunded' ? `
                <div class="ticket-info-item">
                    <i class="fas fa-undo"></i>
                    <span>Refunded on: ${formatDate(booking.refundDate)}</span>
                </div>
                ` : ''}
            </div>
            <div class="ticket-qr-large">
                <img src="${generateQRCode(booking.id)}" alt="QR Code">
                <div class="booking-id">${booking.id}</div>
            </div>
            <div class="selfie-container">
                <h4>Verify Your Identity</h4>
                <p>Upload a selfie to bind to this ticket for verification</p>
                <div class="selfie-preview" id="selfie-preview">
                    ${booking.selfie ? `<img src="${booking.selfie}" alt="Selfie">` : 'No selfie uploaded'}
                </div>
                ${booking.status === 'confirmed' ? `
                <div class="selfie-actions">
                    <button id="take-selfie" class="btn">Take Selfie</button>
                </div>
                ` : ''}
            </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'flex';
    
    // Close button event
    modalContent.querySelector('.close-btn').addEventListener('click', function() {
        modal.style.display = 'none';
        
        // Stop video if it's running
        const video = document.getElementById('selfie-video');
        if (video) {
            const stream = video.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        }
    });
    
    // Take selfie button
    if (booking.status === 'confirmed') {
        document.getElementById('take-selfie').addEventListener('click', function() {
            setupSelfieCapture(booking.id);
        });
    }
}

/**
 * Setup selfie capture for a booking
 */
function setupSelfieCapture(bookingId) {
    const selfiePreview = document.getElementById('selfie-preview');
    
    // Create video element
    selfiePreview.innerHTML = `
        <video id="selfie-video" autoplay playsinline></video>
        <div class="selfie-actions">
            <button id="capture-selfie" class="btn primary-btn">Capture</button>
            <button id="cancel-selfie" class="btn">Cancel</button>
        </div>
    `;
    
    // Get video element
    const video = document.getElementById('selfie-video');
    
    // Access webcam
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
            video.srcObject = stream;
            
            // Capture button
            document.getElementById('capture-selfie').addEventListener('click', function() {
                // Create canvas
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                // Draw video frame to canvas
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                // Convert to base64
                const selfieData = canvas.toDataURL('image/jpeg');
                
                // Save selfie
                saveSelfie(bookingId, selfieData);
                
                // Stop video
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                
                // Show selfie
                selfiePreview.innerHTML = `<img src="${selfieData}" alt="Selfie">`;
            });
            
            // Cancel button
            document.getElementById('cancel-selfie').addEventListener('click', function() {
                // Stop video
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                
                // Reset preview
                const booking = getBookingById(bookingId);
                selfiePreview.innerHTML = booking.selfie ? 
                    `<img src="${booking.selfie}" alt="Selfie">` : 
                    'No selfie uploaded';
                
                // Show take selfie button again
                document.querySelector('.selfie-actions').innerHTML = `
                    <button id="take-selfie" class="btn">Take Selfie</button>
                `;
                
                // Re-add event listener
                document.getElementById('take-selfie').addEventListener('click', function() {
                    setupSelfieCapture(bookingId);
                });
            });
        })
        .catch(error => {
            console.error('Error accessing camera:', error);
            selfiePreview.innerHTML = `
                <div class="error">Camera access denied or not available</div>
                <div class="selfie-actions">
                    <button id="try-again" class="btn">Try Again</button>
                </div>
            `;
            
            document.getElementById('try-again').addEventListener('click', function() {
                setupSelfieCapture(bookingId);
            });
        });
}

/**
 * Save selfie for a booking
 */
function saveSelfie(bookingId, selfieData) {
    const bookings = getLocalData('smarttix_bookings');
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex !== -1) {
        bookings[bookingIndex].selfie = selfieData;
        saveLocalData('smarttix_bookings', bookings);
        return { success: true };
    }
    
    return { success: false, message: 'Booking not found' };
}

/**
 * Verify ticket in admin view
 */
function verifyTicket(bookingId) {
    const booking = getBookingById(bookingId);
    if (!booking) {
        document.getElementById('verification-result').innerHTML = `
            <div class="error">Booking not found</div>
        `;
        return;
    }
    
    document.getElementById('verification-result').innerHTML = `
        <div class="verification-details">
            <div class="verification-header">
                <h3>${booking.eventTitle}</h3>
                <div class="ticket-status ${booking.status}">${booking.status}</div>
            </div>
            <div class="verification-info">
                <div class="verification-info-item">
                    <i class="far fa-calendar-alt"></i>
                    <span>${formatDate(booking.eventDateTime)}</span>
                </div>
                <div class="verification-info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${booking.eventVenue}</span>
                </div>
                <div class="verification-info-item">
                    <i class="fas fa-chair"></i>
                    <span>${booking.seats} seat${booking.seats > 1 ? 's' : ''}</span>
                </div>
                <div class="verification-info-item">
                    <i class="fas fa-user"></i>
                    <span>Booking ID: ${booking.id}</span>
                </div>
            </div>
            <div class="verification-selfie">
                <h4>Identity Verification</h4>
                ${booking.selfie ? 
                    `<img src="${booking.selfie}" alt="Selfie">
                    <div class="verification-status success">Selfie Verified</div>` : 
                    `<div class="verification-status error">No Selfie Uploaded</div>`
                }
            </div>
            <div class="verification-actions">
                <button id="verify-success" class="btn primary-btn">Verify & Allow Entry</button>
                <button id="verify-reject" class="btn danger-btn">Reject Entry</button>
            </div>
        </div>
    `;
    
    // Add event listeners for verification buttons
    document.getElementById('verify-success').addEventListener('click', function() {
        alert('Entry allowed for booking: ' + booking.id);
    });
    
    document.getElementById('verify-reject').addEventListener('click', function() {
        alert('Entry rejected for booking: ' + booking.id);
    });
}

/**
 * Process AI assistant query
 * This function handles natural language queries from the user
 * and returns appropriate responses based on the local event data
 */
function processQuery(query) {
    query = query.toLowerCase().trim();
    
    // Find events by city
    if (query.includes('find') && query.includes('in')) {
        const cityMatch = query.match(/in\s+([a-z]+)/);
        if (cityMatch && cityMatch[1]) {
            const city = cityMatch[1].charAt(0).toUpperCase() + cityMatch[1].slice(1);
            const categoryMatch = query.match(/(movie|concert|workshop|train)/);
            const category = categoryMatch ? categoryMatch[0] : null;
            
            // Filter events by city and optionally by category
            let filteredEvents = events.filter(event => 
                event.city.toLowerCase() === city.toLowerCase() &&
                (category ? event.category.toLowerCase() === category.toLowerCase() : true)
            );
            
            // Check for date filters
            if (query.includes('weekend')) {
                const today = new Date();
                const saturday = new Date(today);
                saturday.setDate(today.getDate() + (6 - today.getDay()));
                const sunday = new Date(saturday);
                sunday.setDate(saturday.getDate() + 1);
                
                filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.datetime);
                    return eventDate >= saturday && eventDate <= sunday;
                });
            } else if (query.includes('today')) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                
                filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.datetime);
                    return eventDate >= today && eventDate < tomorrow;
                });
            } else if (query.includes('tomorrow')) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                const dayAfter = new Date(tomorrow);
                dayAfter.setDate(tomorrow.getDate() + 1);
                
                filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.datetime);
                    return eventDate >= tomorrow && eventDate < dayAfter;
                });
            }
            
            if (filteredEvents.length > 0) {
                let response = `I found ${filteredEvents.length} event${filteredEvents.length > 1 ? 's' : ''} in ${city}`;
                if (category) response += ` for ${category}`;
                response += ':\n\n';
                
                filteredEvents.forEach(event => {
                    response += `- ${event.title} at ${event.venue} on ${formatDate(event.datetime)}, ${formatCurrency(event.base_price + event.service_fee + event.tax)}\n`;
                });
                
                return response;
            } else {
                return `Sorry, I couldn't find any events in ${city}${category ? ` for ${category}` : ''}.`;
            }
        }
    }
    
    // Book tickets
    if (query.includes('book') && (query.includes('ticket') || query.includes('tickets'))) {
        // Extract event title
        const titleMatch = query.match(/for\s+(.+?)(?:\s+in|\s+at|\s+on|$)/);
        if (titleMatch && titleMatch[1]) {
            const title = titleMatch[1].trim();
            
            // Find matching events
            const matchingEvents = events.filter(event => 
                event.title.toLowerCase().includes(title.toLowerCase())
            );
            
            if (matchingEvents.length > 0) {
                const event = matchingEvents[0];
                
                // Extract number of seats
                const seatsMatch = query.match(/(\d+)\s+(?:ticket|tickets|seat|seats)/);
                const seats = seatsMatch ? parseInt(seatsMatch[1]) : 1;
                
                if (seats > event.seats_available) {
                    const alternatives = findAlternativeEvents(event);
                    let response = `Sorry, ${event.title} only has ${event.seats_available} seats available. `;
                    
                    if (alternatives.length > 0) {
                        response += `Here are some alternatives:\n\n`;
                        alternatives.forEach(alt => {
                            response += `- ${alt.title} at ${alt.venue} on ${formatDate(alt.datetime)}, ${formatCurrency(alt.base_price + alt.service_fee + alt.tax)}\n`;
                        });
                    }
                    
                    return response;
                }
                
                const totalCost = (event.base_price + event.service_fee + event.tax) * seats;
                return `I can book ${seats} ticket${seats > 1 ? 's' : ''} for ${event.title} at ${event.venue} on ${formatDate(event.datetime)}. The total cost will be ${formatCurrency(totalCost)}. Would you like to proceed with the booking?`;
            } else {
                return `Sorry, I couldn't find any events matching "${title}".`;
            }
        }
    }
    
    // Confirm booking
    if (query.includes('yes') || query.includes('proceed') || query.includes('confirm')) {
        return "To complete your booking, please click the 'Book Now' button on the event card. I can help you find the event if needed.";
    }
    
    // Check wallet balance
    if (query.includes('wallet') || query.includes('balance')) {
        const wallet = getLocalData('smarttix_wallet');
        return `Your current wallet balance is ${formatCurrency(wallet.balance)}.`;
    }
    
    // Help
    if (query.includes('help') || query.includes('what can you do')) {
        return `I can help you with the following:\n\n- Find events by city, category, and date\n- Book tickets for events\n- Check your wallet balance\n- Answer questions about events\n\nTry asking something like "Find concerts in Mumbai this weekend" or "Book 2 tickets for Rock Night".`;
    }
    
    // Default response
    return "I'm your SmartTix assistant. I can help you find events, book tickets, and answer questions. Try asking something like 'Find concerts in Mumbai' or 'Book 2 tickets for Rock Night'.";
}

/**
 * Find alternative events based on city and category
 */
function findAlternativeEvents(event) {
    return events
        .filter(e => 
            e.id !== event.id && 
            e.city === event.city && 
            e.category === event.category &&
            e.seats_available > 0
        )
        .sort((a, b) => {
            // Sort by date first
            const dateA = new Date(a.datetime);
            const dateB = new Date(b.datetime);
            if (dateA > dateB) return 1;
            if (dateA < dateB) return -1;
            
            // If dates are equal, sort by price
            const priceA = a.base_price + a.service_fee + a.tax;
            const priceB = b.base_price + b.service_fee + b.tax;
            return priceA - priceB;
        })
        .slice(0, 3); // Return top 3 alternatives
}

/**
 * Add message to chat
 */
function addChatMessage(message, isUser = false) {
    if (!FEATURE_FLAGS.aiAssistant) return;
    const chatBody = document.getElementById('chat-body');
    if (!chatBody) return;

    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${isUser ? 'user' : 'assistant'}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = (message || '').toString().replace(/\n/g, '<br>');

    messageElement.appendChild(messageContent);
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize local storage
    initializeLocalStorage();
    
    // Update wallet display
    updateWalletDisplay();
    
    // Display trending events on home page
    displayTrendingEvents();
    
    // Display all events on events page
    displayEvents();
    
    // Display tickets on tickets page
    displayTickets();
    
    // Display transactions on transactions page
    displayTransactions();
    
    // Navigation
    const navLinks = document.querySelectorAll('nav a');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show selected page
            const pageId = this.getAttribute('href').substring(1);
            document.getElementById(pageId).classList.add('active');
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const cityFilter = document.getElementById('city-filter');
    const dateFilter = document.getElementById('date-filter');
    const categoryFilter = document.getElementById('category-filter');
    
    // Populate city filter
    if (cityFilter) {
        const cities = [...new Set(events.map(event => event.city))];
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityFilter.appendChild(option);
        });
    }
    
    // Search button
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            filterEvents();
        });
    }
    
    // Filter events when filters change
    if (searchInput) searchInput.addEventListener('input', filterEvents);
    if (cityFilter) cityFilter.addEventListener('change', filterEvents);
    if (dateFilter) dateFilter.addEventListener('change', filterEvents);
    if (categoryFilter) categoryFilter.addEventListener('change', filterEvents);
    
    // Category buttons on home page
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            categoryFilter.value = category;
            
            // Navigate to events page
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('nav a[href="#events-page"]').classList.add('active');
            
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById('events-page').classList.add('active');
            
            // Filter events
            filterEvents();
        });
    });
    
    // Admin verification
    const verifyButton = document.getElementById('verify-button');
    if (verifyButton) {
        verifyButton.addEventListener('click', function() {
            const bookingIdInput = document.getElementById('booking-id-input');
            if (bookingIdInput) {
                const bookingId = bookingIdInput.value.trim();
                if (bookingId) {
                    verifyTicket(bookingId);
                } else {
                    alert('Please enter a booking ID');
                }
            }
        });
    }
    
    // AI Chat widget
    const chatWidget = document.querySelector('.chat-widget');
    const chatToggle = document.querySelector('.chat-toggle');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send');
    
    // Toggle chat widget
    chatToggle.addEventListener('click', function() {
        chatWidget.classList.toggle('open');
        if (chatWidget.classList.contains('open')) {
            chatInput.focus();
        }
    });
    
    // Send message
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addChatMessage(message, true);
            
            // Process query
            const response = processQuery(message);
            
            // Add assistant message (with slight delay for natural feel)
            setTimeout(() => {
                addChatMessage(response);
            }, 500);
            
            // Clear input
            chatInput.value = '';
        }
    }
    
    // Send button
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendChatMessage);
    }
    
    // Enter key
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Welcome message
    setTimeout(() => {
        addChatMessage("Hi there! I'm your SmartTix assistant. How can I help you today?");
    }, 1000);
});

/**
 * Filter events based on search criteria
 */
function filterEvents() {
    const searchTerm = (document.getElementById('search-input')?.value || '').toLowerCase();
    const cityFilter = document.getElementById('city-filter')?.value || '';
    const dateFilter = document.getElementById('date-filter')?.value || '';
    const sortBy = document.getElementById('sort-select')?.value || 'soonest';

    const sourceEvents = getLocalData('smarttix_events') || events;
    let filteredEvents = sourceEvents.filter(event => {
        const matchesSearch = !searchTerm || (
            event.title.toLowerCase().includes(searchTerm) ||
            event.city.toLowerCase().includes(searchTerm) ||
            event.venue.toLowerCase().includes(searchTerm)
        );

        const matchesCity = !cityFilter || event.city === cityFilter;

        const matchesCategory = !FEATURE_FLAGS.categoryFilter || activeCategory === 'all' || event.category === activeCategory;

        // Date window
        let matchesDate = true;
        if (dateFilter) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const eventDate = new Date(event.datetime);
            if (dateFilter === 'today') {
                const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
                matchesDate = eventDate >= today && eventDate < tomorrow;
            } else if (dateFilter === 'this-week') {
                const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7);
                matchesDate = eventDate >= today && eventDate < nextWeek;
            } else if (dateFilter === 'this-month') {
                const nextMonth = new Date(today); nextMonth.setMonth(today.getMonth() + 1);
                matchesDate = eventDate >= today && eventDate < nextMonth;
            }
        }

        return matchesSearch && matchesCity && matchesCategory && matchesDate;
    });

    // Sort
    filteredEvents.sort((a, b) => {
        if (sortBy === 'price-low-high') return (a.base_price + a.service_fee + a.tax) - (b.base_price + b.service_fee + b.tax);
        if (sortBy === 'price-high-low') return (b.base_price + b.service_fee + b.tax) - (a.base_price + a.service_fee + a.tax);
        if (sortBy === 'seats-most') return b.seats_available - a.seats_available;
        // soonest
        return new Date(a.datetime) - new Date(b.datetime);
    });

    const eventsContainer = document.getElementById('all-events') || document.querySelector('.events-container');
    if (!eventsContainer) return;

    if (filteredEvents.length === 0) {
        eventsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <p>No events found matching your search.</p>
            </div>
        `;
        return;
    }

    let html = '';
    filteredEvents.forEach(event => { html += generateEventCard(event); });
    eventsContainer.innerHTML = html;
}

/**
 * Generate event card HTML
 */
function generateEventCard(event) {
    const totalPrice = event.base_price + event.service_fee + event.tax;
    
    return `
        <div class="event-card" data-event-id="${event.id}">
            <div class="event-image">
                <img src="${event.image_url}" alt="${event.title}">
                <div class="event-category">${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</div>
            </div>
            <div class="event-details">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-info">
                    <div class="event-info-item">
                        <i class="far fa-calendar-alt"></i>
                        <span>${formatDate(event.datetime)}</span>
                    </div>
                    <div class="event-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.venue}</span>
                    </div>
                    <div class="event-info-item">
                        <i class="fas fa-chair"></i>
                        <span>${event.seats_available} seats available</span>
                    </div>
                </div>
                <div class="event-price">
                    <div class="price-display">
                        <div class="price-amount">${formatCurrency(totalPrice)}</div>
                        <div class="price-breakdown">Base: ${formatCurrency(event.base_price)} + Fees: ${formatCurrency(event.service_fee)}</div>
                    </div>
                </div>
                <button class="btn primary-btn book-btn" data-event-id="${event.id}" ${event.seats_available < 1 ? 'disabled' : ''}>
                    ${event.seats_available < 1 ? 'Sold Out' : 'Book Now'}
                </button>
            </div>
        </div>
    `;
}

/**
 * Generate ticket card HTML
 */
function generateTicketCard(booking) {
    const event = getEventById(booking.event_id);
    if (!event) return '';
    
    const statusClass = booking.status === 'confirmed' ? 'status-confirmed' : 'status-refunded';
    const statusText = booking.status === 'confirmed' ? 'Confirmed' : 'Refunded';
    
    return `
        <div class="ticket-card" data-booking-id="${booking.id}">
            <div class="ticket-header">
                <h3>${event.title}</h3>
                <p>${event.venue}</p>
            </div>
            <div class="ticket-banner">
                <img src="${TICKET_IMAGES[event.category] || event.image_url}" alt="${event.title}">
            </div>
            <div class="ticket-body">
                <div class="ticket-status ${statusClass}">${statusText}</div>
                <div class="event-info">
                    <div class="event-info-item">
                        <i class="far fa-calendar-alt"></i>
                        <span>${formatDate(event.datetime)}</span>
                    </div>
                    <div class="event-info-item">
                        <i class="fas fa-chair"></i>
                        <span>${booking.seats} Seat${booking.seats > 1 ? 's' : ''}</span>
                    </div>
                    <div class="event-info-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>${formatCurrency(booking.total_amount)}</span>
                    </div>
                </div>
                <div class="ticket-actions">
                    <button class="btn secondary-btn view-ticket-btn" data-booking-id="${booking.id}">View Ticket</button>
                    ${booking.status === 'confirmed' ? `<button class="btn outline-btn cancel-ticket-btn" data-booking-id="${booking.id}">Cancel</button>` : ''}
                </div>
            </div>
        </div>
    `;
}

/**
 * Generate transaction item HTML
 */
function generateTransactionItem(transaction) {
    const isCredit = transaction.type === 'credit';
    const amountClass = isCredit ? 'amount-credit' : 'amount-debit';
    const amountPrefix = isCredit ? '+' : '-';
    
    return `
        <div class="transaction-item">
            <div class="transaction-info">
                <div class="transaction-title">${transaction.description}</div>
                <div class="transaction-date">${formatDate(transaction.timestamp)}</div>
            </div>
            <div class="transaction-amount ${amountClass}">
                ${amountPrefix}${formatCurrency(transaction.amount)}
            </div>
        </div>
    `;
}

/**
 * Update wallet display
 */
function updateWalletDisplay() {
    const wallet = getLocalData('smarttix_wallet');
    const walletBalanceElement = document.getElementById('wallet-balance');
    if (walletBalanceElement) {
        walletBalanceElement.textContent = formatCurrency(wallet.balance);
    }
    
    // Optional wallet amount element (may not exist in all pages)
    const walletAmountElement = document.getElementById('wallet-amount');
    if (walletAmountElement) {
        walletAmountElement.textContent = wallet.balance.toFixed(2);
    }
    
    // Update transactions list if it exists
    const transactionsList = document.getElementById('transactions-list');
    const emptyTransactions = document.getElementById('empty-transactions');
    
    if (!transactionsList) return;
    
    if (wallet.transactions.length === 0) {
        if (emptyTransactions) emptyTransactions.style.display = 'block';
        return;
    }
    
    if (emptyTransactions) emptyTransactions.style.display = 'none';
    
    let transactionsHTML = '';
    wallet.transactions.forEach(transaction => {
        transactionsHTML += generateTransactionItem(transaction);
    });
    
    transactionsList.innerHTML = transactionsHTML;
}

/**
 * Update tickets display
 */
function updateTicketsDisplay() {
    const bookings = getLocalData('smarttix_bookings');
    const ticketsList = document.getElementById('tickets-list');
    const emptyTickets = document.getElementById('empty-tickets');
    
    if (bookings.length === 0) {
        if (emptyTickets) emptyTickets.style.display = 'block';
        return;
    }
    
    if (emptyTickets) emptyTickets.style.display = 'none';
    
    let ticketsHTML = '';
    bookings.forEach(booking => {
        ticketsHTML += generateTicketCard(booking);
    });
    
    ticketsList.innerHTML = ticketsHTML;
}

/**
 * Render events on the page
 */
function renderEvents() {
    const events = getLocalData('smarttix_events');
    
    // Render trending events (first 3)
    const trendingEventsContainer = document.getElementById('trending-events');
    if (trendingEventsContainer) {
        let trendingHTML = '';
        events.slice(0, 3).forEach(event => {
            trendingHTML += generateEventCard(event);
        });
        trendingEventsContainer.innerHTML = trendingHTML;
    }
    
    // Render all events
    const allEventsContainer = document.getElementById('all-events');
    if (allEventsContainer) {
        let allEventsHTML = '';
        events.forEach(event => {
            allEventsHTML += generateEventCard(event);
        });
        allEventsContainer.innerHTML = allEventsHTML;
    }
}

// ==================== BUSINESS LOGIC ====================

/**
 * Get event by ID
 */
function getEventById(eventId) {
    const events = getLocalData('smarttix_events');
    return events.find(event => event.id === eventId);
}

/**
 * Get booking by ID
 */
function getBookingById(bookingId) {
    const bookings = getLocalData('smarttix_bookings');
    return bookings.find(booking => booking.id === bookingId);
}

/**
 * Generate a unique ID
 */
function generateUniqueId() {
    return 'id' + Math.random().toString(36).substr(2, 9);
}

/**
 * Calculate booking total
 */
function calculateBookingTotal(event, seats) {
    const basePrice = event.base_price * seats;
    const serviceFee = event.service_fee * seats;
    const tax = event.tax * seats;
    return {
        basePrice,
        serviceFee,
        tax,
        total: basePrice + serviceFee + tax
    };
}

/**
 * Create a new booking
 */
function createBooking(eventId, seats) {
    const events = getLocalData('smarttix_events');
    const bookings = getLocalData('smarttix_bookings');
    const wallet = getLocalData('smarttix_wallet');
    
    // Find the event
    const eventIndex = events.findIndex(event => event.id === eventId);
    if (eventIndex === -1) {
        return { success: false, message: 'Event not found' };
    }
    
    const event = events[eventIndex];
    
    // Check seat availability
    if (event.seats_available < seats) {
        return { 
            success: false, 
            message: 'Not enough seats available',
            alternatives: findAlternatives(event, seats)
        };
    }
    
    // Calculate total
    const pricing = calculateBookingTotal(event, seats);
    
    // Check wallet balance
    if (wallet.balance < pricing.total) {
        return { success: false, message: 'Insufficient wallet balance' };
    }
    
    // Create booking object
    const booking = {
        id: generateUniqueId(),
        event_id: eventId,
        seats: seats,
        booking_date: new Date().toISOString(),
        status: 'confirmed',
        base_price: pricing.basePrice,
        service_fee: pricing.serviceFee,
        tax: pricing.tax,
        total_amount: pricing.total,
        qr_code: null,
        selfie: null
    };
    
    // Update event seats
    events[eventIndex].seats_available -= seats;
    
    // Update wallet
    wallet.balance -= pricing.total;
    wallet.transactions.push({
        id: generateUniqueId(),
        type: 'debit',
        amount: pricing.total,
        description: `Booking for ${event.title}`,
        timestamp: new Date().toISOString(),
        reference: booking.id
    });
    
    // Generate QR code
    booking.qr_code = generateQRCode(booking.id);
    
    // Save changes
    bookings.push(booking);
    saveLocalData('smarttix_events', events);
    saveLocalData('smarttix_bookings', bookings);
    saveLocalData('smarttix_wallet', wallet);
    
    return { success: true, booking };
}

/**
 * Cancel a booking
 */
function cancelBooking(bookingId) {
    // Feature gate: refunds
    if (!FEATURE_FLAGS.refundsEnabled) {
        return { success: false, message: 'Refunds are currently disabled' };
    }
    const events = getLocalData('smarttix_events');
    const bookings = getLocalData('smarttix_bookings');
    const wallet = getLocalData('smarttix_wallet');
    
    // Find the booking
    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);
    if (bookingIndex === -1) {
        return { success: false, message: 'Booking not found' };
    }
    
    const booking = bookings[bookingIndex];
    
    // Check if booking is already refunded
    if (booking.status === 'refunded') {
        return { success: false, message: 'Booking is already refunded' };
    }
    
    // Find the event
    const eventIndex = events.findIndex(event => event.id === booking.event_id);
    if (eventIndex === -1) {
        return { success: false, message: 'Event not found' };
    }
    
    // Update booking status
    booking.status = 'refunded';
    booking.refund_type = 'wallet_instant';
    
    // Update event seats
    events[eventIndex].seats_available += booking.seats;
    
    // Update wallet
    wallet.balance += booking.total_amount;
    wallet.transactions.push({
        id: generateUniqueId(),
        type: 'credit',
        amount: booking.total_amount,
        description: `Refund for ${events[eventIndex].title}`,
        timestamp: new Date().toISOString(),
        reference: booking.id
    });
    
    // Save changes
    bookings[bookingIndex] = booking;
    saveLocalData('smarttix_events', events);
    saveLocalData('smarttix_bookings', bookings);
    saveLocalData('smarttix_wallet', wallet);
    
    return { success: true };
}

/**
 * Find alternative events
 */
function findAlternatives(event, seats) {
    const events = getLocalData('smarttix_events');
    
    // Filter events in the same city and category with enough seats
    const alternatives = events.filter(e => 
        e.id !== event.id && 
        e.city === event.city && 
        e.category === event.category && 
        e.seats_available >= seats
    );
    
    // Sort by date and price
    alternatives.sort((a, b) => {
        // First by date
        const dateA = new Date(a.datetime);
        const dateB = new Date(b.datetime);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        
        // Then by price
        const priceA = a.base_price + a.service_fee + a.tax;
        const priceB = b.base_price + b.service_fee + b.tax;
        return priceA - priceB;
    });
    
    // Return up to 3 alternatives
    return alternatives.slice(0, 3);
}

/**
 * Generate QR code
 */
function generateQRCode(data) {
    // Using the qrcode-generator library
    const qr = qrcode(0, 'L');
    qr.addData(data);
    qr.make();
    return qr.createDataURL(10, 0);
}

/**
 * Save selfie for booking
 */
function saveSelfie(bookingId, selfieData) {
    const bookings = getLocalData('smarttix_bookings');
    
    // Find the booking
    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);
    if (bookingIndex === -1) {
        return { success: false, message: 'Booking not found' };
    }
    
    // Update selfie
    bookings[bookingIndex].selfie = selfieData;
    
    // Save changes
    saveLocalData('smarttix_bookings', bookings);
    
    return { success: true };
}

/**
 * Verify booking
 */
function verifyBooking(bookingId) {
    const booking = getBookingById(bookingId);
    if (!booking) {
        return { success: false, message: 'Booking not found' };
    }
    
    const event = getEventById(booking.event_id);
    if (!event) {
        return { success: false, message: 'Event not found' };
    }
    
    return { 
        success: true, 
        booking,
        event,
        hasSelfie: !!booking.selfie
    };
}

// ==================== AI ASSISTANT ====================

/**
 * Simple AI assistant that processes user queries
 * In a real application, this would use a more sophisticated NLP system or OpenAI API
 */
function processAIQuery(query) {
    query = query.toLowerCase();
    
    // Find events by city
    if (query.includes('find') && query.includes('in')) {
        const cityMatch = query.match(/in\s+(\w+)/i);
        if (cityMatch && cityMatch[1]) {
            const city = cityMatch[1].charAt(0).toUpperCase() + cityMatch[1].slice(1);
            const events = getLocalData('smarttix_events');
            const matchedEvents = events.filter(event => event.city.includes(city));
            
            if (matchedEvents.length === 0) {
                return `I couldn't find any events in ${city}. Would you like to check events in another city?`;
            }
            
            let response = `I found ${matchedEvents.length} events in ${city}:\n`;
            matchedEvents.forEach(event => {
                response += `- ${event.title} on ${formatDate(event.datetime)}\n`;
            });
            
            return response;
        }
    }
    
    // Book tickets for an event
    if (query.includes('book') && query.includes('ticket')) {
        const eventMatch = query.match(/for\s+(.+?)($|\s+on|\s+at)/i);
        const seatsMatch = query.match(/(\d+)\s+ticket/i);
        
        if (eventMatch && eventMatch[1]) {
            const eventName = eventMatch[1].trim();
            const seats = seatsMatch ? parseInt(seatsMatch[1]) : 1;
            
            const events = getLocalData('smarttix_events');
            const matchedEvent = events.find(event => 
                event.title.toLowerCase().includes(eventName.toLowerCase())
            );
            
            if (!matchedEvent) {
                return `I couldn't find an event named "${eventName}". Could you try a different event name?`;
            }
            
            return `Would you like to book ${seats} ticket${seats > 1 ? 's' : ''} for ${matchedEvent.title} on ${formatDate(matchedEvent.datetime)}? The total cost will be ${formatCurrency((matchedEvent.base_price + matchedEvent.service_fee) * seats)}.`;
        }
    }
    
    // Default response
    return "I'm your SmartTix assistant. You can ask me to find events in a city or help you book tickets for an event.";
}

// ==================== EVENT HANDLERS ====================

/**
 * Initialize the application
 */
function initApp() {
    // Initialize local storage
    initializeLocalStorage();
    
    // Apply persisted theme
    const savedTheme = localStorage.getItem('smarttix_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Render events
    renderEvents();
    
    // Update wallet display
    updateWalletDisplay();
    
    // Update tickets display
    updateTicketsDisplay();
    
    // Set up event listeners
    setupEventListeners();

    // Feature gating: AI Assistant
    if (!FEATURE_FLAGS.aiAssistant) {
        document.getElementById('chat-widget')?.style && (document.getElementById('chat-widget').style.display = 'none');
        document.getElementById('chat-toggle')?.style && (document.getElementById('chat-toggle').style.display = 'none');
    }

    // Feature gating: Admin Verification
    if (!FEATURE_FLAGS.verificationAdmin) {
        document.getElementById('verify-btn')?.style && (document.getElementById('verify-btn').style.display = 'none');
        document.getElementById('verification-result')?.style && (document.getElementById('verification-result').style.display = 'none');
    }

    // Feature gating: Selfie Verification
    if (!FEATURE_FLAGS.selfieVerification) {
        document.getElementById('selfie-modal')?.style && (document.getElementById('selfie-modal').style.display = 'none');
        document.getElementById('verify-booking-btn')?.style && (document.getElementById('verify-booking-btn').style.display = 'none');
    }
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
        });
    });
    
    // Book buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('book-btn')) {
            const eventId = e.target.getAttribute('data-event-id');
            openBookingModal(eventId);
        }
    });
    
    // Seat increment/decrement
    document.querySelector('.increment-btn')?.addEventListener('click', function() {
        const seatsInput = document.getElementById('seats');
        const currentValue = parseInt(seatsInput.value);
        if (currentValue < 10) {
            seatsInput.value = currentValue + 1;
            updatePriceBreakdown();
        }
    });
    
    document.querySelector('.decrement-btn')?.addEventListener('click', function() {
        const seatsInput = document.getElementById('seats');
        const currentValue = parseInt(seatsInput.value);
        if (currentValue > 1) {
            seatsInput.value = currentValue - 1;
            updatePriceBreakdown();
        }
    });
    
    document.getElementById('seats')?.addEventListener('change', function() {
        updatePriceBreakdown();
    });
    
    // Confirm booking
    document.getElementById('confirm-booking')?.addEventListener('click', function() {
        confirmBooking();
    });
    
    // Close modals
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.classList.remove('show');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            closeModals();
        }, 300);
    });
});
    
    // Back to home
    document.getElementById('back-to-home')?.addEventListener('click', function() {
        closeModals();
        navigateTo('home');
    });
    
    // View ticket
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-ticket-btn')) {
            const bookingId = e.target.getAttribute('data-booking-id');
            viewTicket(bookingId);
        }
    });
    
    // Cancel ticket
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cancel-ticket-btn')) {
            const bookingId = e.target.getAttribute('data-booking-id');
            cancelTicket(bookingId);
        }
    });
    
    // Selfie upload
    document.getElementById('selfie-upload')?.addEventListener('change', function(e) {
        handleSelfieUpload(e);
    });
    
    // Verify booking
    document.getElementById('verify-booking-btn')?.addEventListener('click', function() {
        const bookingId = document.getElementById('booking-id-input').value.trim();
        if (bookingId) {
            verifyTicket(bookingId);
        }
    });
    
    // Chat widget
    document.getElementById('chat-toggle')?.addEventListener('click', function() {
        toggleChatWidget();
    });
    
    document.getElementById('minimize-chat')?.addEventListener('click', function() {
        toggleChatWidget();
    });
    
    document.getElementById('send-chat')?.addEventListener('click', function() {
        sendChatMessage();
    });
    
    document.getElementById('chat-input')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // Search
    document.getElementById('search-input')?.addEventListener('input', function() {
        filterEvents();
    });
    
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            activeCategory = this.getAttribute('data-category') || 'all';
            const btn = document.querySelector('.dropdown-btn');
            if (btn) {
                btn.textContent = activeCategory === 'all' ? 'All Categories' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
            }
            filterEvents();
        });
    });

    // Theme toggle
    if (FEATURE_FLAGS.themeToggle) {
        document.getElementById('theme-toggle')?.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('smarttix_theme', next);
            const icon = document.querySelector('#theme-toggle i');
            if (icon) icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // Sort select
    document.getElementById('sort-select')?.addEventListener('change', function() {
        filterEvents();
    });

    // Wallet top-up
    const topupBtn = document.getElementById('topup-btn');
    if (topupBtn) {
        topupBtn.addEventListener('click', function() {
            const amountInput = document.getElementById('topup-amount');
            const messageEl = document.getElementById('topup-message');
            const raw = amountInput?.value || '';
            const amount = parseFloat(raw);

            if (!amountInput) return;

            // Validate amount
            if (isNaN(amount) || amount <= 0) {
                if (messageEl) {
                    messageEl.textContent = 'Enter a valid amount.';
                    messageEl.style.color = '#c62828';
                }
                return;
            }

            // Update wallet in localStorage
            const wallet = getLocalData('smarttix_wallet');
            wallet.balance += amount;
            wallet.transactions.push({
                id: generateUniqueId(),
                type: 'credit',
                amount,
                description: 'Wallet top-up',
                timestamp: new Date().toISOString()
            });
            saveLocalData('smarttix_wallet', wallet);

            // Refresh UI
            updateWalletDisplay();
            amountInput.value = '';
            if (messageEl) {
                messageEl.textContent = `Added ${formatCurrency(amount)} to wallet.`;
                messageEl.style.color = '#2e7d32';
                setTimeout(() => { messageEl.textContent = ''; }, 3000);
            }
        });
    }
    const resetBtn = document.getElementById('reset-app');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetApp();
        });
    }
}

/**
 * Navigate to a page
 */
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show the selected page
    let pageToShow;
    
    switch (page) {
        case 'home':
            pageToShow = document.getElementById('home-page');
            break;
        case 'events':
            pageToShow = document.getElementById('my-tickets');
            updateTicketsDisplay();
            break;
        case 'admin':
            pageToShow = document.getElementById('admin-page');
            break;
        case 'wallet':
            pageToShow = document.getElementById('wallet-page');
            updateWalletDisplay();
            break;
        default:
            pageToShow = document.getElementById('home-page');
    }
    
    if (pageToShow) {
        pageToShow.classList.add('active');
    }
    
    // Add active class to the nav link
    const activeLink = document.querySelector(`nav a[data-page="${page}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

/**
 * Open booking modal
 */
function openBookingModal(eventId) {
    const event = getEventById(eventId);
    if (!event) return;
    
    const modalEventDetails = document.getElementById('modal-event-details');
    modalEventDetails.innerHTML = `
        <h3>${event.title}</h3>
        <div class="event-info">
            <div class="event-info-item">
                <i class="far fa-calendar-alt"></i>
                <span>${formatDate(event.datetime)}</span>
            </div>
            <div class="event-info-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${event.venue}</span>
            </div>
        </div>
    `;
    
    // Reset seats input
    document.getElementById('seats').value = 1;

    // Store event ID in the modal BEFORE computing prices
    document.getElementById('booking-modal').setAttribute('data-event-id', eventId);

    // Update price breakdown
    updatePriceBreakdown();
    
    // Show the modal with animation
    const modal = document.getElementById('booking-modal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

/**
 * Update price breakdown
 */
function updatePriceBreakdown() {
    const modal = document.getElementById('booking-modal');
    const eventId = modal.getAttribute('data-event-id');
    const event = getEventById(eventId);
    if (!event) return;
    
    const seats = parseInt(document.getElementById('seats').value);
    const pricing = calculateBookingTotal(event, seats);
    
    document.getElementById('base-price').textContent = formatCurrency(pricing.basePrice);
    document.getElementById('service-fee').textContent = formatCurrency(pricing.serviceFee);
    document.getElementById('tax').textContent = formatCurrency(pricing.tax);
    document.getElementById('total-price').textContent = formatCurrency(pricing.total);
}

/**
 * Confirm booking
 */
function confirmBooking() {
    const modal = document.getElementById('booking-modal');
    const eventId = modal.getAttribute('data-event-id');
    const seats = parseInt(document.getElementById('seats').value);
    
    const result = createBooking(eventId, seats);
    
    if (!result.success) {
        alert(result.message);
        
        // If there are alternatives, suggest them
        if (result.alternatives && result.alternatives.length > 0) {
            let message = 'Here are some alternatives:\n';
            result.alternatives.forEach(alt => {
                message += `- ${alt.title} on ${formatDate(alt.datetime)}\n`;
            });
            alert(message);
        }
        
        return;
    }
    
    // Close booking modal
    modal.style.display = 'none';
    
    // Show confirmation modal
    showConfirmationModal(result.booking);
}

/**
 * Show confirmation modal
 */
function showConfirmationModal(booking) {
    const event = getEventById(booking.event_id);
    if (!event) return;
    
    // Set booking details
    const confirmationDetails = document.getElementById('confirmation-details');
    confirmationDetails.innerHTML = `
        <h3>${event.title}</h3>
        <p>${event.venue}</p>
        
        <div class="detail-row">
            <div class="detail-label">Date & Time</div>
            <div class="detail-value">${formatDate(event.datetime)}</div>
        </div>
        
        <div class="detail-row">
            <div class="detail-label">Seats</div>
            <div class="detail-value">${booking.seats} Seat${booking.seats > 1 ? 's' : ''}</div>
        </div>
        
        <div class="detail-row">
            <div class="detail-label">Booking ID</div>
            <div class="detail-value">${booking.id}</div>
        </div>
        
        <div class="detail-row">
            <div class="detail-label">Total Paid</div>
            <div class="detail-value">${formatCurrency(booking.total_amount)}</div>
        </div>
    `;
    
    // Generate QR code
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = `<img src="${booking.qr_code}" alt="Ticket QR Code">`;
    
    // Reset selfie preview
    const selfiePreview = document.getElementById('selfie-preview');
    selfiePreview.innerHTML = '<i class="fas fa-user"></i>';
    
    // Store booking ID in the modal
    document.getElementById('confirmation-modal').setAttribute('data-booking-id', booking.id);
    
    // Show the modal
    document.getElementById('confirmation-modal').style.display = 'block';
    
    // Update wallet display
    updateWalletDisplay();
}

/**
 * Handle selfie upload
 */
function handleSelfieUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const selfieData = event.target.result;
        
        // Display the selfie
        const selfiePreview = document.getElementById('selfie-preview');
        selfiePreview.innerHTML = `<img src="${selfieData}" alt="User Selfie">`;
        
        // Save the selfie
        const modal = document.getElementById('confirmation-modal');
        const bookingId = modal.getAttribute('data-booking-id');
        saveSelfie(bookingId, selfieData);
    };
    
    reader.readAsDataURL(file);
}

/**
 * View ticket
 */
function viewTicket(bookingId) {
    const booking = getBookingById(bookingId);
    if (!booking) return;
    
    // Show confirmation modal with booking details
    showConfirmationModal(booking);
}

/**
 * Cancel ticket
 */
function cancelTicket(bookingId) {
    if (confirm('Are you sure you want to cancel this booking? The amount will be refunded to your wallet.')) {
        const result = cancelBooking(bookingId);
        
        if (!result.success) {
            alert(result.message);
            return;
        }
        
        alert('Booking cancelled successfully. The amount has been refunded to your wallet.');
        
        // Update displays
        updateWalletDisplay();
        updateTicketsDisplay();
    }
}

/**
 * Verify ticket
 */
function verifyTicket(bookingId) {
    const result = verifyBooking(bookingId);
    
    if (!result.success) {
        document.getElementById('verification-result').innerHTML = `
            <div class="verification-error">
                <i class="fas fa-times-circle"></i>
                <h3>Verification Failed</h3>
                <p>${result.message}</p>
            </div>
        `;
        return;
    }
    
    const { booking, event, hasSelfie } = result;
    
    let verificationHTML = `
        <div class="verification-success">
            <i class="fas fa-check-circle"></i>
            <h3>Ticket Verified</h3>
            
            <div class="verified-details">
                <div class="detail-row">
                    <div class="detail-label">Event</div>
                    <div class="detail-value">${event.title}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Date & Time</div>
                    <div class="detail-value">${formatDate(event.datetime)}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Venue</div>
                    <div class="detail-value">${event.venue}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Seats</div>
                    <div class="detail-value">${booking.seats} Seat${booking.seats > 1 ? 's' : ''}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Booking ID</div>
                    <div class="detail-value">${booking.id}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Status</div>
                    <div class="detail-value">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</div>
                </div>
            </div>
    `;
    
    if (hasSelfie) {
        verificationHTML += `
            <div class="selfie-verification">
                <h4>Identity Verification</h4>
                <div class="selfie-container">
                    <img src="${booking.selfie}" alt="User Selfie">
                </div>
                <p>Please verify that the person matches this selfie.</p>
            </div>
        `;
    } else {
        verificationHTML += `
            <div class="selfie-verification">
                <h4>Identity Verification</h4>
                <p>No selfie uploaded for this booking.</p>
            </div>
        `;
    }
    
    verificationHTML += `</div>`;
    
    document.getElementById('verification-result').innerHTML = verificationHTML;
}

/**
 * Close all modals
 */
function closeModals() {
    document.getElementById('booking-modal').style.display = 'none';
    document.getElementById('confirmation-modal').style.display = 'none';
}

/**
 * Toggle chat widget
 */
function toggleChatWidget() {
    const chatWidget = document.getElementById('chat-widget');
    const isVisible = chatWidget.style.display === 'flex';
    
    chatWidget.style.display = isVisible ? 'none' : 'flex';
}

/**
 * Send chat message
 */
function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addChatMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Process the message
    const response = processAIQuery(message);
    
    // Add assistant response to chat
    setTimeout(() => {
        addChatMessage(response, 'assistant');
    }, 500);
}

/**
 * Add message to chat
 */
function addChatMessage(message, sender = 'assistant') {
    if (!FEATURE_FLAGS.aiAssistant) return;
    const chatBody = document.getElementById('chat-body');
    if (!chatBody) return;

    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = (message || '').toString().replace(/\n/g, '<br>');

    messageElement.appendChild(messageContent);
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

/**
 * Filter events based on search and category
 */
function filterEvents() {
    const searchTerm = (document.getElementById('search-input')?.value || '').toLowerCase();
    const cityFilter = document.getElementById('city-filter')?.value || '';
    const dateFilter = document.getElementById('date-filter')?.value || '';
    const sortBy = document.getElementById('sort-select')?.value || 'soonest';

    const sourceEvents = getLocalData('smarttix_events') || events;
    let filteredEvents = sourceEvents.filter(event => {
        const matchesSearch = !searchTerm || (
            event.title.toLowerCase().includes(searchTerm) ||
            event.city.toLowerCase().includes(searchTerm) ||
            event.venue.toLowerCase().includes(searchTerm)
        );

        const matchesCity = !cityFilter || event.city === cityFilter;

        const matchesCategory = !FEATURE_FLAGS.categoryFilter || activeCategory === 'all' || event.category === activeCategory;

        let matchesDate = true;
        if (dateFilter) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const eventDate = new Date(event.datetime);
            if (dateFilter === 'today') {
                const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
                matchesDate = eventDate >= today && eventDate < tomorrow;
            } else if (dateFilter === 'this-week') {
                const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7);
                matchesDate = eventDate >= today && eventDate < nextWeek;
            } else if (dateFilter === 'this-month') {
                const nextMonth = new Date(today); nextMonth.setMonth(today.getMonth() + 1);
                matchesDate = eventDate >= today && eventDate < nextMonth;
            }
        }

        return matchesSearch && matchesCity && matchesCategory && matchesDate;
    });

    filteredEvents.sort((a, b) => {
        if (sortBy === 'price-low-high') return (a.base_price + a.service_fee + a.tax) - (b.base_price + b.service_fee + b.tax);
        if (sortBy === 'price-high-low') return (b.base_price + b.service_fee + b.tax) - (a.base_price + a.service_fee + a.tax);
        if (sortBy === 'seats-most') return b.seats_available - a.seats_available;
        return new Date(a.datetime) - new Date(b.datetime);
    });

    const eventsContainer = document.getElementById('all-events') || document.querySelector('.events-container');
    if (!eventsContainer) return;

    if (filteredEvents.length === 0) {
        eventsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <p>No events found matching your search.</p>
            </div>
        `;
        return;
    }

    let html = '';
    filteredEvents.forEach(event => { html += generateEventCard(event); });
    eventsContainer.innerHTML = html;
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
function resetApp() {
    localStorage.removeItem('smarttix_events');
    localStorage.removeItem('smarttix_wallet');
    localStorage.removeItem('smarttix_bookings');
    localStorage.removeItem('smarttix_theme');
    initApp();
    navigateTo('home');
}