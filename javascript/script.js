// job application tracker

let interviewList = [];
let rejectedList = [];

let total = document.getElementById("total-job-count");
let interviewCount = document.getElementById("total-interview-count");
let rejectedCount = document.getElementById("total-rejected-count");

const allTabBtn = document.getElementById("all-jobs-filter-btn");
const interviewTabBtn = document.getElementById("all-interviews-filter-btn");
const rejectedTabBtn = document.getElementById("all-rejected-filter-btn");

const allCardSection = document.getElementById("job-list");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("job-results");

const noJobAvailable = document.getElementById("no-job-available");


function calculateCount() {
  const jobCards = allCardSection.querySelectorAll(".cardContainer");
  total.innerText = jobCards.length;

  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  tabJobCount();
}



function tabJobCount() {
  const countElement = document.querySelector(".flex.justify-between p.text-gray-500");

  const totalJobs = allCardSection.querySelectorAll(".cardContainer").length;

  if (allTabBtn.classList.contains("bg-[#3B82F6]")) {
    countElement.innerText = totalJobs + " jobs";
  } else if (interviewTabBtn.classList.contains("bg-[#3B82F6]")) {
    countElement.innerText = interviewList.length + " of " + totalJobs + " jobs";
  } else if (rejectedTabBtn.classList.contains("bg-[#3B82F6]")) {
    countElement.innerText = rejectedList.length + " of " + totalJobs + " jobs";
  }
}

function toggleStyle(id) {
  // Reset all buttons
  allTabBtn.classList.add("bg-base-100", "text-gray-500");
  interviewTabBtn.classList.add("bg-base-100", "text-gray-500");
  rejectedTabBtn.classList.add("bg-base-100", "text-gray-500");

  allTabBtn.classList.remove("bg-[#3B82F6]", "text-white");
  interviewTabBtn.classList.remove("bg-[#3B82F6]", "text-white");
  rejectedTabBtn.classList.remove("bg-[#3B82F6]", "text-white");

  // Highlight selected button
  const selected = document.getElementById(id);
  selected.classList.remove("bg-base-100", "text-gray-500");
  selected.classList.add("bg-[#3B82F6]", "text-white");

  // Show/hide sections based on filter
  if (id === "all-interviews-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderInterview();
  } else if (id === "all-jobs-filter-btn") {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
    noJobAvailable.classList.add("hidden");
  } else if (id === "all-rejected-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderRejected();
  }

  tabJobCount();
}

// Initial count calculation
calculateCount();


mainContainer.addEventListener("click", function (event) {
  
  if (
    event.target.classList.contains("btn-success") ||
    event.target.closest(".btn-success")
  ) {
    const btn = event.target.classList.contains("btn-success")
      ? event.target
      : event.target.closest(".btn-success");
    const parenNode = btn.closest(".job-card-content");

    const companyName = parenNode.querySelector(".jobCompanyName").innerText;
    const position = parenNode.querySelector(".job-position").innerText;
    const location = parenNode.querySelector(".job-location").innerText;
    const type = parenNode.querySelector(".job-type").innerText;
    const salary = parenNode.querySelector(".job-salary").innerText;
    const description = parenNode.querySelector(".job-description").innerText;

    // Remove from rejected list if exists
    rejectedList = rejectedList.filter(
      (job) => !(job.companyName === companyName && job.position === position),
    );

    // Update status in the DOM
    const statusElement = parenNode.querySelector(".job-Status");
    statusElement.innerText = "INTERVIEW";
    statusElement.className =
      "job-Status px-3 py-2 text-[14px] rounded-md border bg-green-100 text-green-500 border-green-400 font-[600]";

    // Add to interview list
    const CardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      jobStatus: "INTERVIEW",
      description,
    };

    const jobExist = interviewList.find(
      (item) =>
        item.companyName === CardInfo.companyName &&
        item.position === CardInfo.position,
    );

    if (!jobExist) {
      interviewList.push(CardInfo);
    }

    calculateCount();

    // Re-render if in filtered view
    if (interviewTabBtn.classList.contains("bg-[#3B82F6]")) {
      renderInterview();
    }
    if (rejectedTabBtn.classList.contains("bg-[#3B82F6]")) {
      renderRejected();
    }
  }
  
  else if (
    event.target.classList.contains("btn-error") ||
    event.target.closest(".btn-error")
  ) {
    const btn = event.target.classList.contains("btn-error")
      ? event.target
      : event.target.closest(".btn-error");
    const parenNode = btn.closest(".job-card-content");

    const companyName = parenNode.querySelector(".jobCompanyName").innerText;
    const position = parenNode.querySelector(".job-position").innerText;
    const location = parenNode.querySelector(".job-location").innerText;
    const type = parenNode.querySelector(".job-type").innerText;
    const salary = parenNode.querySelector(".job-salary").innerText;
    const description = parenNode.querySelector(".job-description").innerText;

    // Remove from interview list if exists
    interviewList = interviewList.filter(
      (job) => !(job.companyName === companyName && job.position === position),
    );

    // Update status in the DOM
    const statusElement = parenNode.querySelector(".job-Status");
    statusElement.innerText = "REJECTED";
    statusElement.className =
      "job-Status px-3 py-2 text-[14px] rounded-md border bg-red-100 text-red-500 border-red-400 font-[600]";

    // Add to rejected list
    const CardInfo = {
      companyName,
      position,
      location,
      type,
      salary,
      jobStatus: "REJECTED",
      description,
    };

    const jobExist = rejectedList.find(
      (item) =>
        item.companyName === CardInfo.companyName &&
        item.position === CardInfo.position,
    );

    if (!jobExist) {
      rejectedList.push(CardInfo);
    }

    calculateCount();

    // Re-render if in filtered view
    if (interviewTabBtn.classList.contains("bg-[#3B82F6]")) {
      renderInterview();
    }
    if (rejectedTabBtn.classList.contains("bg-[#3B82F6]")) {
      renderRejected();
    }
  }
  // Handle DELETE button click
  else if (
    event.target.closest(".btn-delete") ||
    event.target.classList.contains("btn-delete")
  ) {
    const card = event.target.closest(".cardContainer");

    if (!card) return;

    const companyName = card.querySelector(".jobCompanyName").innerText;
    const position = card.querySelector(".job-position").innerText;

    card.remove();

    // Remove from both lists
    interviewList = interviewList.filter(
      (job) => job.companyName !== companyName || job.position !== position,
    );
    rejectedList = rejectedList.filter(
      (job) => job.companyName !== companyName || job.position !== position,
    );

    calculateCount();
  }
});

// Helper function to get status class
function getStatusClass(status) {
  if (status === "INTERVIEW") {
    return "job-Status px-3 py-2 text-[14px] rounded-md border bg-green-100 text-green-500 border-green-400 font-[600]";
  } else {
    return "job-Status px-3 py-2 text-[14px] rounded-md border bg-red-100 text-red-500 border-red-400 font-[600]";
  }
}

// Render interview jobs
function renderInterview() {
  filterSection.innerHTML = "";

  if (interviewList.length === 0) {
    filterSection.appendChild(noJobAvailable);
    noJobAvailable.classList.remove("hidden");
    return;
  } else {
    noJobAvailable.classList.add("hidden");
  }

  for (let interview of interviewList) {
    let div = document.createElement("div");
    div.className =
      "job-card-content flex flex-col gap-10 md:flex-row justify-between bg-base-100 p-6 rounded-lg mb-5 mt-7 cardContainer";

    div.innerHTML = `
      <div>
        <h2 class="jobCompanyName text-[#002C5C] text-[18px] font-semibold">
          ${interview.companyName}
        </h2>
        <p class="job-position text-[16px] text-gray-500">
          ${interview.position}
        </p>

        <div class="text-gray-500 my-5 flex flex-col gap-4 md:flex-row md:gap-2">
          <p class="job-location">${interview.location}</p>
          <p class="job-type">${interview.type}</p>
          <p class="job-salary">${interview.salary}</p>
        </div>

        <div>
          <span class="${getStatusClass(interview.jobStatus)}">${interview.jobStatus}</span>
        </div>

        <p class="job-description text-[#323B49] text-[14px] mt-3">
          ${interview.description}
        </p>

        <div class="job-actions mt-5 flex gap-2">
          <button class="btn btn-sm btn-outline btn-success rounded-md">INTERVIEW</button>
          <button class="btn btn-sm btn-outline btn-error rounded-md">REJECTED</button>
        </div>
      </div>

      <div>
        <button class="btn btn-delete rounded-full">
          <img src="./image/Trash.png" alt="Delete Job" />
        </button>
      </div>
    `;
    filterSection.appendChild(div);
  }
}

// Render rejected jobs
function renderRejected() {
  filterSection.innerHTML = "";

  if (rejectedList.length === 0) {
    filterSection.appendChild(noJobAvailable);
    noJobAvailable.classList.remove("hidden");
    return;
  } else {
    noJobAvailable.classList.add("hidden");
  }

  for (let reject of rejectedList) {
    let div = document.createElement("div");
    div.className =
      "job-card-content flex flex-col gap-10 md:flex-row justify-between bg-base-100 p-6 rounded-lg mb-5 mt-7 cardContainer";

    div.innerHTML = `
      <div>
        <h2 class="jobCompanyName text-[#002C5C] text-[18px] font-semibold">
          ${reject.companyName}
        </h2>
        <p class="job-position text-[16px] text-gray-500">
          ${reject.position}
        </p>

        <div class="text-gray-500 my-5 flex flex-col gap-4 md:flex-row md:gap-2">
          <p class="job-location">${reject.location}</p>
          <p class="job-type">${reject.type}</p>
          <p class="job-salary">${reject.salary}</p>
        </div>

        <div>
          <span class="${getStatusClass(reject.jobStatus)}">${reject.jobStatus}</span>
        </div>

        <p class="job-description text-[#323B49] text-[14px] mt-3">
          ${reject.description}
        </p>

        <div class="job-actions mt-5 flex gap-2">
          <button class="btn btn-sm btn-outline btn-success rounded-md">INTERVIEW</button>
          <button class="btn btn-sm btn-outline btn-error rounded-md">REJECTED</button>
        </div>
      </div>

      <div>
        <button class="btn btn-delete rounded-full">
          <img src="./image/Trash.png" alt="Delete Job" />
        </button>
      </div>
    `;
    filterSection.appendChild(div);
  }
}