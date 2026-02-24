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

