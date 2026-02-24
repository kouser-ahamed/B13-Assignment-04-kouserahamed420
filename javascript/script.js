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
