// Web Dashboard Client-Side Logic

document.addEventListener('DOMContentLoaded', () => {
  const sidebarNav = document.getElementById('sidebar-nav');
  const overviewPanel = document.getElementById('overview-panel');
  const taskPanel = document.getElementById('task-panel');
  
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  
  const taskBadge = document.getElementById('task-badge');
  const taskTitle = document.getElementById('task-title');
  const queryCode = document.getElementById('query-code');
  const resultCode = document.getElementById('result-code');
  
  const btnRun = document.getElementById('btn-run');
  const btnSpinner = document.getElementById('btn-spinner');
  const btnText = btnRun.querySelector('.btn-text');
  
  const btnSeed = document.getElementById('btn-seed');
  const btnCopy = document.getElementById('btn-copy');
  const resultSuccessBadge = document.getElementById('result-success-badge');
  const toast = document.getElementById('toast');

  let activeTaskId = null;
  let allTasks = [];

  // 1. Fetch connection status
  async function checkStatus() {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      if (data.connected) {
        statusDot.className = 'status-dot connected';
        statusText.textContent = `Connected to local MongoDB (DB: ${data.database})`;
      } else {
        statusDot.className = 'status-dot disconnected';
        statusText.textContent = 'Failed to connect to local MongoDB database.';
      }
    } catch (err) {
      statusDot.className = 'status-dot disconnected';
      statusText.textContent = 'Server connection error.';
    }
  }

  // 2. Fetch all tasks and build the sidebar
  async function fetchTasks() {
    try {
      const res = await fetch('/api/tasks');
      allTasks = await res.json();
      buildSidebar(allTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  }

  // Group tasks by category and build accordion elements
  function buildSidebar(tasksList) {
    sidebarNav.innerHTML = '';
    
    // Group tasks by category
    const grouped = {};
    tasksList.forEach(t => {
      if (!grouped[t.category]) {
        grouped[t.category] = [];
      }
      grouped[t.category].push(t);
    });

    // Create DOM structure for each category
    for (const [category, items] of Object.entries(grouped)) {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'category-group';
      
      const trigger = document.createElement('button');
      trigger.className = 'category-trigger';
      trigger.innerHTML = `
        <span>${category}</span>
        <span class="arrow">▶</span>
      `;
      
      const itemsDiv = document.createElement('div');
      itemsDiv.className = 'category-items';
      
      items.forEach(task => {
        const itemBtn = document.createElement('button');
        itemBtn.className = 'task-item';
        itemBtn.textContent = `t${task.id}: ${task.title}`;
        itemBtn.title = `t${task.id}: ${task.title}`;
        itemBtn.addEventListener('click', () => selectTask(task.id, itemBtn));
        itemsDiv.appendChild(itemBtn);
      });

      trigger.addEventListener('click', () => {
        groupDiv.classList.toggle('open');
      });

      groupDiv.appendChild(trigger);
      groupDiv.appendChild(itemsDiv);
      sidebarNav.appendChild(groupDiv);
    }
  }

  // 3. Selection handler
  function selectTask(id, btnElement) {
    // Remove active class from previous
    document.querySelectorAll('.task-item').forEach(el => el.classList.remove('active'));
    btnElement.classList.add('active');

    // Find task
    const task = allTasks.find(t => t.id === id);
    if (!task) return;

    activeTaskId = id;
    
    // Reveal panel
    overviewPanel.classList.add('hidden');
    taskPanel.classList.remove('hidden');

    // Populate panel details
    taskBadge.textContent = `Task t${task.id}`;
    taskTitle.textContent = task.title;
    queryCode.textContent = task.queryStr;
    resultCode.textContent = '// Output will appear here after execution...';
    resultSuccessBadge.classList.add('hidden');
  }

  // 4. Run handler
  btnRun.addEventListener('click', async () => {
    if (!activeTaskId) return;

    // Show loading
    btnSpinner.classList.remove('hidden');
    btnText.textContent = 'Running...';
    btnRun.disabled = true;
    resultSuccessBadge.classList.add('hidden');

    try {
      const res = await fetch(`/api/run-task/${activeTaskId}`);
      const data = await res.json();
      
      if (res.ok) {
        // Format JSON output
        resultCode.textContent = JSON.stringify(data.result, null, 2);
        resultSuccessBadge.classList.remove('hidden');
      } else {
        resultCode.textContent = `Error: ${data.error}`;
      }
    } catch (err) {
      resultCode.textContent = `Client Error: ${err.message}`;
    } finally {
      btnSpinner.classList.add('hidden');
      btnText.textContent = 'Execute Query';
      btnRun.disabled = false;
    }
  });

  // 5. Seed database handler
  btnSeed.addEventListener('click', async () => {
    btnSeed.disabled = true;
    btnSeed.innerHTML = '⚡ Seeding...';
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || 'Database successfully seeded!');
      } else {
        showToast(`Seeding failed: ${data.error}`);
      }
    } catch (err) {
      showToast(`Error: ${err.message}`);
    } finally {
      btnSeed.disabled = false;
      btnSeed.innerHTML = '⚡ Seed Database';
    }
  });

  // 6. Copy query code to clipboard
  btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(queryCode.textContent)
      .then(() => {
        showToast('Query copied to clipboard!');
      })
      .catch(err => {
        console.error('Copy failed:', err);
      });
  });

  // Toast notifier helper
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }

  // Initialize page details
  checkStatus();
  fetchTasks();
});
