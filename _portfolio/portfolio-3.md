---
title: "Optimizing Goalie Pulls in the NHL"
excerpt: "When should a trailing NHL team pull its goalie in a one-goal game? An analysis of historical play-by-play and shift data finds the optimal time is with 4:34 remaining."
collection: portfolio
---

*Originally published on Medium: [Read the full article](https://carodaniel.medium.com/optimizing-goalie-pulls-in-the-nhl-83de0258eff4) · 8 min read · Sep 11, 2024*

### Objective

Analyze historical play-by-play data to determine the optimal time for an NHL team to pull their goalie when down by one goal. Traditionally viewed as a last-resort maneuver executed with 1–2 minutes remaining, teams are increasingly pulling earlier. This project evaluates whether that shift is statistically justified.

### Background

Theoretical models and industry benchmarks suggest the traditional window is overly conservative:

* **Hockey Graphs:** Showed the average pull time in one-goal games rose from 1:13 (2013–14) to 1:46 (2019–20).
* **MoneyPuck:** Recommends pulling with just over 4:00 remaining.
* **Chance (ASA):** Identifies the optimal window between 5:30 and 9:10 remaining.
* **Big Think:** Recommends pulling as early as 6:10 remaining.

### Data Collection & Engineering

Built a pipeline to perform a comparative analysis of scoring probabilities versus time remaining:

* **Data Sources:** Ingested game events (goals, shots, penalties) and player shift bounds (start/end timestamps) via the official NHL API.
* **Scope & Filtering:** Restricted analysis to 2010–11 onward for data reliability. Filtered out delayed penalty situations by cross-referencing pull durations with penalty timestamps. Focused the core analysis on the final 5 minutes of the 3rd period to minimize residual noise.
* **Goalie Identification:** Generated a reference map of goalie playerIds from all recorded shots faced since 2010 to differentiate skater shifts from goalie shifts. Unscheduled gaps between goalie shifts were flagged as pulled-goalie scenarios.
* **Tech Stack:** Python (`requests`) for ingestion and SQLite (`sqlite3`) for structured querying.

### Methodology

Compared the rate of scoring with an extra attacker against standard 5-on-5 play:

* **Extra Attacker State:** Tracked Goals For (GF), Goals Against (GA / empty net), and No Goal outcomes for every duration $t$ (0–450 seconds) post-pull. Assumed the goalie returns immediately following any goal.
* **Full-Strength State:** Analyzed one-goal games starting at the 10:00 mark of the 3rd period up to the next goal or goalie pull. Set the effective end of full-strength play at 2:30 remaining (the 10th percentile of observed pull times, where 90% of pulls occur afterward).

### Findings

The breakeven point, where the scoring probability with an extra attacker surpasses full-strength scoring probability, occurs at **274 seconds (4:34) remaining**.

<img src="/images/goalie-pull-graph.png" alt="Full Strength vs Empty Net Goal Probability: intersection at 274s (4:34)" style="width:100%; max-width:700px; display:block; margin:1em auto; border:1px solid #ddd; border-radius:6px;">

*Figure: Scoring probability with empty net (blue) vs. full strength (red) vs. time remaining. Intersection ≈ 274s.*

This empirical result falls between MoneyPuck's model (~4:00) and the *Chance* study (5:30–9:10), closely validating MoneyPuck and confirming that early pulls yield a distinct statistical advantage.

### Conclusion

Initiating a pull based on quantitative analysis around 4:34 remaining provides a measurable edge over the traditional 1–2 minute window. Future work could incorporate team-specific metrics, such as real-time skater fatigue and goaltender performance, to dynamically adjust the pull time per game context.

*Tools Used: Python, NHL API, SQLite, Logistic-Regression Probability Modeling*
