$ErrorActionPreference = "Stop"
$baseUrl = "http://localhost:5000"

try {
    Write-Host "1. Testing Room Creation..."
    try {
        $createRes = Invoke-RestMethod -Uri "$baseUrl/api/room/create" -Method Post -Body (@{ playerName = "Tester1"; day = "rose_day" } | ConvertTo-Json) -ContentType "application/json"
        $roomCode = $createRes.roomCode
        Write-Host "Room Created: $roomCode"
    }
    catch {
        Write-Error "Failed to create room: $_"
        exit 1
    }

    if (-not $roomCode) {
        Write-Error "Failed to create room (No Code)"
        exit 1
    }

    Write-Host "2. Testing Join Room..."
    try {
        $joinRes = Invoke-RestMethod -Uri "$baseUrl/api/room/join" -Method Post -Body (@{ roomCode = $roomCode; playerName = "Tester2" } | ConvertTo-Json) -ContentType "application/json"
        Write-Host "Joined Room Success: $($joinRes.success)"
    }
    catch {
        Write-Error "Failed to join room: $_"
        exit 1
    }

    Write-Host "3. Testing Leaderboard Safeguards..."
    
    # Attempt to add blocked user
    $blockedEntry = @{
        dayId          = "rose_day"
        player1Name    = "Tester1"
        player2Name    = "Tester2"
        lovePercentage = 100
        completionTime = 60
    }
    $lbResBlocked = Invoke-RestMethod -Uri "$baseUrl/api/leaderboard" -Method Post -Body ($blockedEntry | ConvertTo-Json) -ContentType "application/json"
    Write-Host "Blocked Entry Attempt Response: $($lbResBlocked.success)"

    # Attempt to add allowed user
    $allowedEntry = @{
        dayId          = "rose_day"
        player1Name    = "Romeo"
        player2Name    = "Juliet"
        lovePercentage = 95
        completionTime = 120
    }
    $lbResAllowed = Invoke-RestMethod -Uri "$baseUrl/api/leaderboard" -Method Post -Body ($allowedEntry | ConvertTo-Json) -ContentType "application/json"
    Write-Host "Allowed Entry Created: $($lbResAllowed.success)"

    Write-Host "4. Fetching Overall Leaderboard..."
    $overall = Invoke-RestMethod -Uri "$baseUrl/api/leaderboard/overall" -Method Get
    Write-Host "Leaderboard Count: $($overall.Count)"
    
    # Check if Romeo is there
    $romeoFound = $false
    # Check if Tester is there
    $testerFound = $false
    
    foreach ($entry in $overall) {
        if ($entry.player1Name -eq "Romeo") { $romeoFound = $true }
        if ($entry.player1Name -like "*Tester*") { $testerFound = $true }
    }

    if ($romeoFound -and -not $testerFound) {
        Write-Host "Verification Passed! Safeguards active and DB working."
    }
    else {
        if (-not $romeoFound) { Write-Error "Failed: Allowed user 'Romeo' not found in leaderboard." }
        if ($testerFound) { Write-Error "Failed: Blocked user 'Tester' FOUND in leaderboard." }
    }
}
catch {
    Write-Error "Unexpected error: $_"
    exit 1
}
