// AutoTest Runner — app.js

const testCases = [
    { name: 'auth.login_valid_user', module: 'auth', status: 'passed', duration: '45ms' },
    { name: 'auth.login_invalid_password', module: 'auth', status: 'passed', duration: '32ms' },
    { name: 'auth.login_locked_account', module: 'auth', status: 'failed', duration: '120ms', error: 'Expected 423, got 401' },
    { name: 'auth.session_expiry', module: 'auth', status: 'passed', duration: '89ms' },
    { name: 'auth.refresh_token', module: 'auth', status: 'passed', duration: '56ms' },
    { name: 'users.create_admin', module: 'users', status: 'passed', duration: '78ms' },
    { name: 'users.create_duplicate', module: 'users', status: 'passed', duration: '34ms' },
    { name: 'users.update_profile', module: 'users', status: 'passed', duration: '62ms' },
    { name: 'users.delete_account', module: 'users', status: 'failed', duration: '210ms', error: 'Foreign key constraint' },
    { name: 'users.list_pagination', module: 'users', status: 'passed', duration: '145ms' },
    { name: 'orders.create_basic', module: 'orders', status: 'passed', duration: '92ms' },
    { name: 'orders.create_empty_cart', module: 'orders', status: 'passed', duration: '28ms' },
    { name: 'orders.process_payment', module: 'orders', status: 'passed', duration: '340ms' },
    { name: 'orders.apply_discount', module: 'orders', status: 'passed', duration: '56ms' },
    { name: 'orders.cancel_pending', module: 'orders', status: 'failed', duration: '180ms', error: 'State transition invalid' },
    { name: 'orders.refund_completed', module: 'orders', status: 'passed', duration: '267ms' },
    { name: 'payments.stripe_webhook', module: 'payments', status: 'passed', duration: '45ms' },
    { name: 'payments.process_refund', module: 'payments', status: 'passed', duration: '189ms' },
    { name: 'payments.currency_convert', module: 'payments', status: 'passed', duration: '23ms' },
    { name: 'notifications.email_send', module: 'notifications', status: 'skipped', duration: '-' },
    { name: 'notifications.push_send', module: 'notifications', status: 'passed', duration: '67ms' },
    { name: 'api.rate_limit', module: 'api', status: 'passed', duration: '12ms' },
    { name: 'api.auth_middleware', module: 'api', status: 'passed', duration: '34ms' },
    { name: 'api.cors_headers', module: 'api', status: 'passed', duration: '18ms' },
];

let activeFilter = 'all';

function renderTests() {
    const tbody = document.getElementById('testTableBody');
    const filtered = activeFilter === 'all' ? testCases : testCases.filter(t => t.status === activeFilter);

    tbody.innerHTML = filtered.map(t => {
        const icon = t.status === 'passed' ? '✓' : t.status === 'failed' ? '✗' : '–';
        const statusClass = t.status === 'passed' ? 'pass' : t.status === 'failed' ? 'fail' : 'skip';
        return `
            <tr>
                <td><span class="status-icon ${statusClass}">${icon}</span></td>
                <td>
                    <div class="test-name">${t.name}</div>
                    ${t.error ? `<div style="font-size:11px;color:var(--failed);margin-top:2px">${t.error}</div>` : ''}
                </td>
                <td><span class="module-badge">${t.module}</span></td>
                <td><span class="duration">${t.duration}</span></td>
                <td><button class="rerun-btn" onclick="rerunTest('${t.name}')">▶ Rerun</button></td>
            </tr>
        `;
    }).join('');
}

function updateSummary() {
    const total = testCases.length;
    const passed = testCases.filter(t => t.status === 'passed').length;
    const failed = testCases.filter(t => t.status === 'failed').length;
    const skipped = testCases.filter(t => t.status === 'skipped').length;

    document.getElementById('totalTests').textContent = total;
    document.getElementById('passedTests').textContent = passed;
    document.getElementById('failedTests').textContent = failed;
    document.getElementById('skippedTests').textContent = skipped;
}

function rerunTest(name) {
    const test = testCases.find(t => t.name === name);
    if (!test) return;
    test.status = 'passed';
    test.duration = Math.floor(Math.random() * 200 + 20) + 'ms';
    delete test.error;
    renderTests();
    updateSummary();
}

function generateTests() {
    const btn = document.getElementById('generateBtn');
    btn.textContent = '🤖 Generating...';
    btn.disabled = true;
    document.getElementById('runStatus').textContent = '● Generating tests...';
    document.getElementById('runStatus').className = 'run-status running';

    const newTests = [
        { name: 'payments.retry_failed', module: 'payments', status: 'passed', duration: '156ms' },
        { name: 'notifications.batch_send', module: 'notifications', status: 'passed', duration: '234ms' },
        { name: 'users.export_csv', module: 'users', status: 'passed', duration: '189ms' },
    ];

    setTimeout(() => {
        testCases.push(...newTests);
        renderTests();
        updateSummary();
        btn.textContent = '🤖 Generate Tests';
        btn.disabled = false;
        document.getElementById('runStatus').textContent = '● Ready';
        document.getElementById('runStatus').className = 'run-status';
    }, 2000);
}

function runAll() {
    const btn = document.getElementById('runAllBtn');
    btn.textContent = '⏳ Running...';
    btn.disabled = true;
    document.getElementById('runStatus').textContent = '● Running tests...';
    document.getElementById('runStatus').className = 'run-status running';

    let idx = 0;
    const interval = setInterval(() => {
        if (idx < testCases.length) {
            const t = testCases[idx];
            t.status = Math.random() > 0.15 ? 'passed' : 'failed';
            t.duration = Math.floor(Math.random() * 300 + 10) + 'ms';
            if (t.status === 'failed') t.error = 'Assertion failed';
            else delete t.error;
            renderTests();
            updateSummary();
            idx++;
        } else {
            clearInterval(interval);
            btn.textContent = '▶ Run All';
            btn.disabled = false;
            document.getElementById('runStatus').textContent = '● Ready';
            document.getElementById('runStatus').className = 'run-status';
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    renderTests();
    updateSummary();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            renderTests();
        });
    });

    document.getElementById('generateBtn').addEventListener('click', generateTests);
    document.getElementById('runAllBtn').addEventListener('click', runAll);
});
