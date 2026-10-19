# Human–Computer Interaction Mini-Project

## Usability Evaluation of Aryan Doshi's Portfolio

**Project type:** Individual HCI mini-project  
**System under evaluation:** Aryan Doshi's React portfolio  
**Evaluation status:** Evaluation instruments and task protocol are implemented. Participant results and a full accessibility audit have not yet been collected.

## 1. Project Overview

The system is a responsive portfolio for presenting the author's education, experience, projects, technical skills, writing, and contact information. The HCI work examines whether visitors can find that information, understand the available controls, and complete common tasks using pointer or keyboard interaction.

The portfolio includes a section-based navigation, project browsing and filtering, a command palette, theme controls, an HCI guide, a contact form, and an interactive evaluation dashboard. Evaluation inputs are saved in the visitor's browser and can be exported as JSON.

## 2. Objectives and Evaluation Questions

The evaluation is designed to answer these questions:

1. Can a first-time visitor locate important portfolio information and complete the defined tasks?
2. Can users understand the navigation, project controls, keyboard shortcuts, and contact form feedback?
3. What usability issues are revealed by Nielsen's 10 heuristics?
4. What usability score do respondents report using the System Usability Scale (SUS)?
5. Which WCAG 2.2 AA checks require remediation?

## 3. Method

### 3.1 Heuristic Evaluation

Use Nielsen's 10 heuristics to inspect the interface. Record each finding's affected location, evidence, severity (0–4), and recommended change. Severity 0 means no usability problem; severity 4 means a usability catastrophe that prevents task completion.

One major issue was observed during integration: opening either the user-testing or SUS panel produced a rendering failure, preventing access to the evaluation tools. The missing animation import and malformed SUS question rendering were corrected. Both panels were then opened successfully in the browser. This is an implementation finding, not a participant-study result.

### 3.2 Task-Based Usability Sessions

The dashboard provides five moderated task scenarios. For each participant, start the timer before the task, observe without coaching, record errors and the participant's satisfaction rating, then record success or failure. Do not mark a task successful unless the success criterion was met. Task time thresholds are planning targets, not measured baselines.

### 3.3 System Usability Scale

The dashboard implements the 10-item SUS with a five-point response scale. Positive items (1, 3, 5, 7, 9) are scored as response minus one; negative items (2, 4, 6, 8, 10) are scored as five minus response. The sum is multiplied by 2.5 to produce a 0–100 score. Collect responses from actual participants; do not treat a single author's or developer's response as a group result.

### 3.4 Accessibility Review

The dashboard includes a checklist for WCAG 2.2 AA and supplemental accessibility checks, plus fields for Lighthouse scores. Each criterion remains “Not tested” until it has been checked. Automated scores alone do not establish WCAG conformance; record the tool, date, page state, and any manual checks alongside results.

## 4. Task Scenarios

| # | Participant scenario | Success criterion | HCI focus | Planned time |
|---|---|---|---|---:|
| 1 | Find the AlphaAgent project and its repository. | Open the project's GitHub repository link. | Recognition over recall; Hick's Law | 15 sec |
| 2 | Find the resume as a recruiter. | Locate and open the resume file. | Fitts's Law; clear signifiers | 10 sec |
| 3 | Find a blog article about a chosen topic. | Filter by a tag and open an article. | Progressive disclosure; information scent | 20 sec |
| 4 | Switch to the preferred color theme. | Change the theme with the header control or D shortcut. | Flexibility and efficiency; user control | 8 sec |
| 5 | Find the contact form and inspect its validation. | Identify required fields and correct an invalid entry without sending a message. | Error prevention and recovery | 30 sec |

The time values are targets for comparing sessions, not observed results.

## 5. Measures and Reporting Rules

- **Task success rate:** successful task attempts divided by recorded task attempts. Report the numerator and denominator.
- **Time on task:** elapsed seconds from task start to the participant's outcome. Report the mean and range, and include failed attempts.
- **Errors:** count observable missteps that require correction or assistance; define the counting rule before sessions.
- **Task satisfaction:** participant rating from 1 (low) to 5 (high), reported with the sample size.
- **SUS:** calculate one score per complete respondent, then report the sample size and aggregate summary. Do not infer a group score from one response.
- **Heuristic severity:** report only inspected findings and their evidence. An uninspected heuristic is not a zero-severity finding.
- **Accessibility:** distinguish automated tool output from manual review and report unresolved issues.

## 6. Results

### Participant Study

No participant sessions or SUS responses are recorded in the current project data. Task success, time, error, satisfaction, and SUS results are therefore **not available** and are intentionally not estimated.

### Heuristic Review

| Finding | Heuristic | Severity | Status |
|---|---|---:|---|
| Selecting the user-test or SUS panel caused a rendering failure and prevented access to both evaluation tools. | Help users recognize, diagnose, and recover from errors | 3 — Major | Fixed; both panels were opened successfully after the code change. |

The other nine heuristics remain unassessed. The dashboard contains fields to record them after inspection.

### Accessibility Audit

Lighthouse scores and WCAG checklist results have not been collected. No conformance claim is made in this report.

## 7. HCI Design Decisions Present in the Portfolio

- **Recognition over recall:** visible section names, project technology tags, blog tags, and a searchable command palette.
- **Flexibility and efficiency:** section navigation, Ctrl/Cmd+K command palette, D theme shortcut, and ? HCI guide shortcut.
- **User control:** dismissible overlays and keyboard Escape support in modal components.
- **Error prevention and recovery:** required contact fields and form validation feedback.
- **Bypass repeated content:** a skip-to-main-content link is provided.
- **Progressive disclosure:** project summaries and article cards provide entry points to more detail.

These are implementation observations, not measured claims about user performance or accessibility conformance.

## 8. Limitations and Data Collection Notes

- Participant count, demographics, recruitment method, and test environment must be recorded when sessions are conducted.
- The five task-time values are planning targets and should be revised after a pilot session if needed.
- The evaluation dashboard stores data in the current browser's local storage. Export the JSON data and keep a separate backup before resetting it or using another browser/device.
- The dashboard currently records one SUS response set and one task outcome per task in that browser. Export and preserve each participant's record before clearing data; aggregate participant scores explicitly in the final analysis.
- The heuristic issue listed above was found while fixing the evaluation UI; it is not a substitute for a complete independent heuristic evaluation.

## 9. Conclusion

The portfolio now includes the planned HCI evaluation tools and a corrected path to open the task-testing and SUS panels. One major implementation issue was identified and fixed during integration. The project is ready to collect structured evidence, but participant-based usability results and accessibility-audit findings must be collected before reporting a completed user study or claiming WCAG conformance.

## References

- Brooke, J. (1996). “SUS: A quick and dirty usability scale.” In *Usability Evaluation in Industry*.
- Nielsen, J. (1994). *Enhancing the explanatory power of usability heuristics*. Proceedings of CHI '94.
- W3C. *Web Content Accessibility Guidelines (WCAG) 2.2*.
