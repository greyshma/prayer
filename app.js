document.addEventListener("DOMContentLoaded", () => {
    // ─── STATE MANAGEMENT ───
    const state = {
        prayerStreak: parseInt(localStorage.getItem('jy_prayer_streak')) || 0,
        massStreak: parseInt(localStorage.getItem('jy_mass_streak')) || 0,
        monthlyMass: parseInt(localStorage.getItem('jy_monthly_mass')) || 0,
        monthlyPrayer: parseInt(localStorage.getItem('jy_monthly_prayer')) || 0,
        massCount: parseInt(localStorage.getItem('jy_mass_count')) || 0, // Out of 10
        rosaryUnlocked: localStorage.getItem('jy_rosary_unlocked') === 'true',
        alarmActive: localStorage.getItem('jy_alarm_active') === 'true',
        prayerPartner: JSON.parse(localStorage.getItem('jy_prayer_partner')) || null,
        birthdays: JSON.parse(localStorage.getItem('jy_birthdays')) || []
    };

    function saveState() {
        localStorage.setItem('jy_prayer_streak', state.prayerStreak);
        localStorage.setItem('jy_mass_streak', state.massStreak);
        localStorage.setItem('jy_monthly_mass', state.monthlyMass);
        localStorage.setItem('jy_monthly_prayer', state.monthlyPrayer);
        localStorage.setItem('jy_mass_count', state.massCount);
        localStorage.setItem('jy_rosary_unlocked', state.rosaryUnlocked);
        localStorage.setItem('jy_alarm_active', state.alarmActive);
        localStorage.setItem('jy_prayer_partner', JSON.stringify(state.prayerPartner));
        localStorage.setItem('jy_birthdays', JSON.stringify(state.birthdays));
    }

    // ─── UTILS ───
    function showToast(msg, icon = '✨') {
        const toast = document.getElementById('toast');
        const countMsg = document.getElementById('toastMsg');
        toast.querySelector('.toast-icon').innerText = icon;
        countMsg.innerText = msg;

        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ─── NAVIGATION ───
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const sections = document.querySelectorAll('.section-page');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Show corresponding section
            const targetId = item.getAttribute('data-target');
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');

            // Close mobile sidebar if open
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('open');
                document.getElementById('sidebarOverlay').classList.remove('show');
            }
        });
    });

    // Mobile Menu
    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
        document.getElementById('sidebar').classList.add('open');
        document.getElementById('sidebarOverlay').classList.add('show');
    });

    document.getElementById('sidebarOverlay').addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('show');
    });

    // ─── FEATURE 1: WEEKLY SCHEDULE ───
    const scheduleData = [
        { day: 'Monday', code: 'mon', event: 'Core Meeting', desc: 'Planning and spiritual discussion for Core members.', time: '4:30 PM - 5:30 PM' },
        { day: 'Tuesday', code: 'tue', event: 'Intersession', desc: 'Prayer interceding for students and the campus.', time: '4:30 PM - 5:30 PM' },
        { day: 'Wednesday', code: 'wed', event: 'Gathering', desc: 'Weekly JY Gathering with worship, sharing & prayer.', time: '4:30 PM - 6:00 PM' },
        { day: 'Thursday', code: 'thu', event: 'Prolife Rosary', desc: 'Praying the Holy Rosary for the unborn and life.', time: '4:30 PM - 5:00 PM' }
    ];

    function renderSchedule() {
        const container = document.getElementById('weeklySchedule');
        const currentDataRaw = new Date().getDay();
        // JS getDay(): 0=Sun, 1=Mon, ..., 4=Thu
        container.innerHTML = '';

        scheduleData.forEach((item, index) => {
            const isToday = currentDataRaw === (index + 1);

            container.innerHTML += `
                <div class="schedule-day ${isToday ? 'today' : ''}">
                    <div class="day-badge day-${item.code}">${item.day.substring(0, 3)}</div>
                    <div class="schedule-info">
                        <h4>${item.event} <span style="font-size:10px; color:var(--text-muted); font-weight:normal;">| ${item.time}</span></h4>
                        <p>${item.desc}</p>
                    </div>
                </div>
            `;
        });
    }

    // ─── FEATURE 2: ALARM SYSTEM ───
    const alarmToggle = document.getElementById('alarmMassToggle');
    const alarmDisplay = document.getElementById('alarmCardDisplay');
    const noAlarmText = document.getElementById('noAlarmText');

    function updateAlarmUI() {
        if (state.alarmActive) {
            alarmToggle.classList.add('active');
            alarmDisplay.style.display = 'flex';
            noAlarmText.style.display = 'none';
        } else {
            alarmToggle.classList.remove('active');
            alarmDisplay.style.display = 'none';
            noAlarmText.style.display = 'block';
        }
    }

    alarmToggle.addEventListener('click', () => {
        state.alarmActive = !state.alarmActive;
        saveState();
        updateAlarmUI();
        if (state.alarmActive) showToast("Mass alarm set for 6:00 AM daily", "⏰");
    });

    // ─── FEATURE 9: BIBLE QUOTE ───
    const quotes = [
        { q: "I can do all things through Christ who strengthens me.", r: "Philippians 4:13" },
        { q: "Trust in the LORD with all your heart, and do not lean on your own understanding.", r: "Proverbs 3:5" },
        { q: "Be strong and courageous. Do not be frightened, and do not be dismayed, for the LORD your God is with you wherever you go.", r: "Joshua 1:9" },
        { q: "And we know that in all things God works for the good of those who love him.", r: "Romans 8:28" },
        { q: "Cast all your anxiety on him because he cares for you.", r: "1 Peter 5:7" }
    ];

    // Pick random quote based on day of year to keep it same for the day
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const todayQuote = quotes[dayOfYear % quotes.length];

    document.getElementById('dailyBibleQuote').innerText = `"${todayQuote.q}"`;
    document.getElementById('dailyBibleRef').innerText = `- ${todayQuote.r}`;

    // ─── FEATURE 10: PRAYER PARTNER ───
    const names = ["Abraham", "Merin", "Joseph", "Ann Mary", "Thomas", "Tessa", "George", "Rose"];

    function updatePartnerUI() {
        if (state.prayerPartner) {
            document.getElementById('prayerPartnerDisplay').style.display = 'block';
            document.getElementById('partnerName').innerText = state.prayerPartner;
            document.getElementById('btnAssignPartner').innerHTML = `<i class="fa-solid fa-shuffle"></i> Get New Partner`;
        }
    }

    document.getElementById('btnAssignPartner').addEventListener('click', () => {
        const randomName = names[Math.floor(Math.random() * names.length)];
        state.prayerPartner = randomName;
        saveState();
        updatePartnerUI();
        showToast(`Your new prayer partner is ${randomName}!`, "🤝");
    });

    // ─── FEATURE 14 & 15: STREAKS & SUMMARY ───
    function updateStatsUI() {
        document.getElementById('prayerStreak').innerText = state.prayerStreak;
        document.getElementById('massStreak').innerText = state.massStreak;
        document.getElementById('monthlyMassCount').innerText = state.monthlyMass;
        document.getElementById('monthlyPrayerCount').innerText = state.monthlyPrayer;
    }

    document.getElementById('btnLogPrayer').addEventListener('click', () => {
        state.prayerStreak++;
        state.monthlyPrayer++;
        saveState();
        updateStatsUI();
        showToast("Prayer logged! Streak increased.", "🔥");
    });

    // ─── FEATURE 5: MASS TRACKER & REWARDS ───
    function updateMassRewardsUI() {
        document.getElementById('massCountText').innerText = state.massCount;
        document.getElementById('massProgressBar').style.width = `${(state.massCount / 10) * 100}%`;

        if (state.massCount >= 10 && !state.rosaryUnlocked) {
            document.getElementById('rewardUnlockedSection').style.display = 'block';
        } else if (state.rosaryUnlocked) {
            document.getElementById('rewardUnlockedSection').style.display = 'none';
            document.getElementById('virtualRosaryContainer').style.display = 'block';
            document.getElementById('btnOpenMassModal').innerText = "Already Completed 10 Masses! 🎉";
            document.getElementById('btnOpenMassModal').disabled = true;
        }
    }

    // Modal Logic
    const massModal = document.getElementById('massModalOverlay');
    document.getElementById('btnOpenMassModal').addEventListener('click', () => {
        if (state.massCount < 10) {
            document.getElementById('massDate').valueAsDate = new Date();
            massModal.classList.add('show');
        }
    });

    document.getElementById('closeMassModal').addEventListener('click', () => {
        massModal.classList.remove('show');
    });

    document.getElementById('massLogForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const parish = document.getElementById('massParish').value;

        if (state.massCount < 10) {
            state.massCount++;
            state.massStreak++;
            state.monthlyMass++;
            saveState();
            updateStatsUI();
            updateMassRewardsUI();
            showToast(`Holy Mass at ${parish} logged!`, "⛪");
            massModal.classList.remove('show');
            e.target.reset();
        }
    });

    document.getElementById('hailMaryCheck').addEventListener('change', (e) => {
        document.getElementById('btnClaimRosary').disabled = !e.target.checked;
    });

    document.getElementById('btnClaimRosary').addEventListener('click', () => {
        state.rosaryUnlocked = true;
        saveState();
        showToast("Virtual Rosary Unlocked!", "📿");
        updateMassRewardsUI();
    });

    document.getElementById('btnSendGift').addEventListener('click', () => {
        const fname = document.getElementById('giftFriendName').value || "your friend";
        showToast(`Sent virtual rosary blessing to ${fname}!`, "🕊️");
        document.getElementById('giftFriendName').value = "";
    });

    // ─── FEATURE 7: PRAY BOX ───
    document.getElementById('prayerRequestForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const author = document.getElementById('prayerName').value || "Anonymous";
        const text = document.getElementById('prayerIntention').value;

        const newPray = `
            <div class="prayer-item">
                <div class="prayer-item-header">
                    <span class="prayer-author">${author}</span>
                    <span class="prayer-time">Just now</span>
                </div>
                <p class="prayer-text">${text}</p>
                <div class="prayer-actions">
                    <button class="btn btn-outline btn-sm pray-btn"><i class="fa-solid fa-hands-praying"></i> Pray</button>
                    <span class="pray-count" style="display:none;">1 praying</span>
                </div>
            </div>
        `;

        document.getElementById('prayerBoard').insertAdjacentHTML('afterbegin', newPray);
        document.getElementById('prayerRequestForm').reset();
        showToast("Prayer request dropped in the box.", "✉️");
        bindPrayBtns(); // rebind
    });

    // Initial dummy data for Pray Box
    const initialPrayers = [
        { author: "Maria", text: "Please pray for my upcoming semester exams." },
        { author: "Anonymous", text: "For my father's quick recovery from surgery." }
    ];

    initialPrayers.forEach(p => {
        document.getElementById('prayerBoard').innerHTML += `
            <div class="prayer-item">
                <div class="prayer-item-header">
                    <span class="prayer-author">${p.author}</span>
                    <span class="prayer-time">2 hrs ago</span>
                </div>
                <p class="prayer-text">${p.text}</p>
                <div class="prayer-actions">
                    <button class="btn btn-outline btn-sm pray-btn"><i class="fa-solid fa-hands-praying"></i> Pray</button>
                    <span class="pray-count" style="display:none;"><span class="count-val">0</span> praying</span>
                </div>
            </div>
        `;
    });

    function bindPrayBtns() {
        document.querySelectorAll('.pray-btn').forEach(btn => {
            // Prevent multiple bindings
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', function () {
                if (this.classList.contains('active')) return; // Already clicked

                this.classList.add('active');
                this.innerHTML = '<i class="fa-solid fa-check"></i> Prayed';
                this.style.background = 'rgba(212,168,83,0.1)';
                this.style.color = 'var(--gold)';
                this.style.borderColor = 'var(--gold)';

                const countSpan = this.nextElementSibling;
                countSpan.style.display = 'block';
                const cv = countSpan.querySelector('.count-val');
                if (cv) cv.innerText = parseInt(cv.innerText) + 1;

                // Track prayer in stats
                state.prayerStreak++;
                state.monthlyPrayer++;
                saveState();
                updateStatsUI();

                showToast("You are praying for this intention.", "🙏");
            });
        });
    }
    bindPrayBtns();

    // ─── FEATURE 8: EVENT SUGGESTIONS ───
    document.getElementById('eventSuggestionForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Event suggestion submitted to Core!", "💡");
        e.target.reset();
    });

    // ─── FEATURE 12: MINISTRY PROFILES ───
    const ministries = [
        { name: "Fr. Thomas", role: "Chaplain", avatar: "T", color: "#8b5cf6" },
        { name: "Anna K.", role: "Student Coordinator", avatar: "A", color: "#f43f5e" },
        { name: "Jerin Mathew", role: "Music Ministry Head", avatar: "JM", color: "#10b981" },
        { name: "Sneha P.", role: "Media Head", avatar: "SP", color: "#38bdf8" },
        { name: "Alen J.", role: "Intercession Head", avatar: "AJ", color: "#d4a853" },
        { name: "Riya M.", role: "Outreach Coordinator", avatar: "RM", color: "#a78bfa" }
    ];

    const ministryGrid = document.getElementById('ministryGrid');
    ministries.forEach(m => {
        ministryGrid.innerHTML += `
            <div class="member-card">
                <div class="member-avatar" style="background:${m.color}">${m.avatar}</div>
                <div class="member-name">${m.name}</div>
                <div class="member-role-text">${m.role}</div>
            </div>
        `;
    });

    // Community Tabs
    document.querySelectorAll('.tab').forEach(t => {
        t.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(tt => tt.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');

            t.classList.add('active');
            document.getElementById(`tab-${t.getAttribute('data-tab')}`).style.display = 'block';
        });
    });

    document.getElementById('btnJoinAlumni').addEventListener('click', () => {
        showToast("Request to join Alumni Network sent!", "🎓");
    });

    // ─── FEATURE 13: BIRTHDAYS ───
    function renderBirthdays() {
        const list = document.getElementById('birthdayList');
        list.innerHTML = '';

        if (state.birthdays.length === 0) {
            list.innerHTML = `<p style="font-size:13px; color:var(--text-muted); font-style:italic;">No upcoming birthdays.</p>`;
            return;
        }

        const today = new Date();
        const cm = today.getMonth() + 1;
        const cd = today.getDate();
        let showBlessingCard = false;
        let bdayPerson = "";

        state.birthdays.forEach((b, idx) => {
            const bDate = new Date(b.date);
            const m = bDate.getMonth() + 1;
            const d = bDate.getDate();
            const isToday = (cm === m && cd === d);

            if (isToday) {
                showBlessingCard = true;
                bdayPerson = b.name;
            }

            list.innerHTML += `
                <div class="birthday-card" style="${isToday ? 'border-color:var(--gold); box-shadow: 0 0 15px rgba(212,168,83,0.2);' : ''}">
                    <div class="birthday-avatar">${isToday ? '🎉' : b.name.charAt(0)}</div>
                    <div class="birthday-info">
                        <h4>${b.name} ${isToday ? '<span class="badge badge-gold" style="margin-left:5px;">Today!</span>' : ''}</h4>
                        <p>${new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                </div>
            `;
        });

        if (showBlessingCard) {
            document.getElementById('specialBlessingCard').style.display = 'block';
            document.getElementById('blessingBdayName').innerText = bdayPerson;
        }
    }

    document.getElementById('birthdayForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('bdayName').value;
        const date = document.getElementById('bdayDate').value;

        state.birthdays.push({ name, date });
        state.birthdays.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
        saveState();
        renderBirthdays();

        showToast("Birthday added successfully!", "🎂");
        e.target.reset();
    });

    // ─── INIT ───
    renderSchedule();
    updateAlarmUI();
    updatePartnerUI();
    updateStatsUI();
    updateMassRewardsUI();
    renderBirthdays();

    // Instagram Like Logic
    document.querySelectorAll('.insta-actions .fa-heart').forEach(heartBtn => {
        heartBtn.addEventListener('click', function () {
            if (this.classList.contains('fa-regular')) {
                this.classList.remove('fa-regular');
                this.classList.add('fa-solid');
                this.style.color = '#f43f5e';
            } else {
                this.classList.remove('fa-solid');
                this.classList.add('fa-regular');
                this.style.color = '';
            }
        });
    });
});
