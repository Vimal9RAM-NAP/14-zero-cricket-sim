import json
import random

# Core database of iconic IPL player-seasons (2008 - 2026)
raw_dataset = [
    # Openers
    ("Virat Kohli", "Opener", "2016 RCB", 98, 20, False),
    ("Virat Kohli", "Opener", "2024 RCB", 94, 10, False),
    ("Chris Gayle", "Opener", "2012 RCB", 97, 35, True),
    ("Chris Gayle", "Opener", "2013 RCB", 96, 25, True),
    ("David Warner", "Opener", "2016 SRH", 96, 0, True),
    ("David Warner", "Opener", "2019 SRH", 95, 0, True),
    ("Jos Buttler", "Opener", "2022 RR", 96, 0, True),
    ("KL Rahul", "Opener", "2020 KXIP", 93, 0, False),
    ("Shubman Gill", "Opener", "2023 GT", 96, 0, False),
    ("Yashasvi Jaiswal", "Opener", "2023 RR", 92, 10, False),
    ("Travis Head", "Opener", "2024 SRH", 95, 20, True),
    ("Abhishek Sharma", "Opener", "2024 SRH", 91, 40, False),
    ("Rohit Sharma", "Opener", "2015 MI", 90, 15, False),
    ("Gautam Gambhir", "Opener", "2012 KKR", 89, 0, False),
    ("Brendon McCullum", "Opener", "2008 KKR", 91, 0, True),
    ("Shane Watson", "Opener", "2018 CSK", 91, 75, True),
    ("Ruturaj Gaikwad", "Opener", "2021 CSK", 92, 0, False),
    ("Faf du Plessis", "Opener", "2021 CSK", 91, 0, True),
    ("Devdutt Padikkal", "Opener", "2020 RCB", 85, 0, False),
    ("Quinton de Kock", "Opener", "2020 MI", 89, 0, True),

    # Middle Order
    ("AB de Villiers", "Middle Order", "2016 RCB", 97, 10, True),
    ("AB de Villiers", "Middle Order", "2015 RCB", 96, 10, True),
    ("Suresh Raina", "Middle Order", "2014 CSK", 93, 45, False),
    ("Suresh Raina", "Middle Order", "2010 CSK", 91, 50, False),
    ("Suryakumar Yadav", "Middle Order", "2023 MI", 96, 0, False),
    ("Suryakumar Yadav", "Middle Order", "2024 MI", 94, 0, False),
    ("Rinku Singh", "Middle Order", "2023 KKR", 90, 0, False),
    ("Heinrich Klaasen", "Middle Order", "2024 SRH", 95, 0, True),
    ("Sanju Samson", "Middle Order", "2021 RR", 89, 0, False),
    ("Shreyas Iyer", "Middle Order", "2024 KKR", 88, 0, False),
    ("Shivam Dube", "Middle Order", "2024 CSK", 89, 30, False),
    ("Ambati Rayudu", "Middle Order", "2018 CSK", 88, 0, False),
    ("Yuvraj Singh", "Middle Order", "2014 RCB", 86, 60, False),
    ("Glenn Maxwell", "Middle Order", "2014 KXIP", 95, 55, True),
    ("Glenn Maxwell", "Middle Order", "2021 RCB", 91, 50, True),
    ("Nicholas Pooran", "Middle Order", "2024 LSG", 92, 0, True),
    ("Rishabh Pant", "Middle Order", "2018 DD", 96, 0, False),
    ("Tilak Varma", "Middle Order", "2023 MI", 87, 20, False),
    ("Tristan Stubbs", "Middle Order", "2024 DC", 89, 30, True),
    ("David Miller", "Middle Order", "2022 GT", 90, 0, True),

    # Wicketkeepers
    ("MS Dhoni", "Wicketkeeper", "2011 CSK", 93, 0, False),
    ("MS Dhoni", "Wicketkeeper", "2018 CSK", 94, 0, False),
    ("MS Dhoni", "Wicketkeeper", "2019 CSK", 92, 0, False),
    ("Rishabh Pant", "Wicketkeeper", "2019 DC", 91, 0, False),
    ("Sanju Samson", "Wicketkeeper", "2024 RR", 91, 0, False),
    ("Dinesh Karthik", "Wicketkeeper", "2022 RCB", 92, 0, False),
    ("Dinesh Karthik", "Wicketkeeper", "2018 KKR", 89, 0, False),
    ("Ishitesh Kishan", "Wicketkeeper", "2020 MI", 90, 0, False),
    ("Wriddhiman Saha", "Wicketkeeper", "2014 KXIP", 86, 0, False),
    ("Phil Salt", "Wicketkeeper", "2024 KKR", 91, 0, True),

    # All-Rounders
    ("Hardik Pandya", "All-Rounder", "2019 MI", 90, 84, False),
    ("Hardik Pandya", "All-Rounder", "2022 GT", 89, 82, False),
    ("Sunil Narine", "All-Rounder", "2018 KKR", 84, 93, True),
    ("Sunil Narine", "All-Rounder", "2024 KKR", 93, 91, True),
    ("Ravindra Jadeja", "All-Rounder", "2021 CSK", 86, 89, False),
    ("Ravindra Jadeja", "All-Rounder", "2023 CSK", 82, 90, False),
    ("Andre Russell", "All-Rounder", "2019 KKR", 97, 85, True),
    ("Andre Russell", "All-Rounder", "2024 KKR", 88, 87, True),
    ("Shane Watson", "All-Rounder", "2008 RR", 89, 88, True),
    ("Marcus Stoinis", "All-Rounder", "2024 LSG", 89, 75, True),
    ("Axar Patel", "All-Rounder", "2023 DC", 82, 86, False),
    ("Kieron Pollard", "All-Rounder", "2013 MI", 88, 80, True),
    ("Kieron Pollard", "All-Rounder", "2020 MI", 91, 65, True),
    ("Sam Curran", "All-Rounder", "2020 CSK", 80, 84, True),
    ("Cameron Green", "All-Rounder", "2023 MI", 88, 76, True),

    # Bowlers
    ("Jasprit Bumrah", "Bowler", "2020 MI", 20, 98, False),
    ("Jasprit Bumrah", "Bowler", "2024 MI", 15, 99, False),
    ("Lasith Malinga", "Bowler", "2011 MI", 10, 98, True),
    ("Lasith Malinga", "Bowler", "2017 MI", 10, 94, True),
    ("Rashid Khan", "Bowler", "2018 SRH", 60, 96, True),
    ("Rashid Khan", "Bowler", "2022 GT", 68, 94, True),
    ("Yuzvendra Chahal", "Bowler", "2022 RR", 10, 93, False),
    ("Yuzvendra Chahal", "Bowler", "2015 RCB", 10, 91, False),
    ("Bhuvaneshwar Kumar", "Bowler", "2016 SRH", 15, 95, False),
    ("Bhuvaneshwar Kumar", "Bowler", "2017 SRH", 15, 94, False),
    ("Mohammed Shami", "Bowler", "2023 GT", 15, 95, False),
    ("Kagiso Rabada", "Bowler", "2020 DC", 15, 94, True),
    ("Trent Boult", "Bowler", "2020 MI", 15, 93, True),
    ("Harshal Patel", "Bowler", "2021 RCB", 25, 94, False),
    ("Varun Chakaravarthy", "Bowler", "2024 KKR", 10, 92, False),
    ("Kuldeep Yadav", "Bowler", "2024 DC", 20, 93, False),
    ("Arshdeep Singh", "Bowler", "2023 PBKS", 10, 89, False),
    ("Matheesha Pathirana", "Bowler", "2023 CSK", 10, 92, True),
    ("Mitchell Starc", "Bowler", "2015 RCB", 15, 94, True),
    ("Dwayne Bravo", "Bowler", "2013 CSK", 40, 93, True)
]

players_list = []

# Expand base seed list into 200 balanced entries with slight variance
player_id = 1
for i in range(3):  # Scale loop
    for name, role, era, bat, bowl, foreign in raw_dataset:
        # Add micro variations for statistical balance across duplicates
        bat_var = max(10, min(99, bat + random.randint(-2, 2)))
        bowl_var = max(10, min(99, bowl + random.randint(-2, 2)))
        
        players_list.append({
            "id": player_id,
            "name": name,
            "role": role,
            "team_era": era if i == 0 else f"{era} (Alt)",
            "batting": bat_var,
            "bowling": bowl_var,
            "is_foreign": foreign
        })
        player_id += 1
        if player_id > 200:
            break
    if player_id > 200:
        break


with open("players.json", "w") as f:
    json.dump(players_list, f, indent=2)

print(f"Successfully generated {len(players_list)} player entries in players.json!")