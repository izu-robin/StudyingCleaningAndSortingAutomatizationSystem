<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataFile = 'grain_data.json';

function readData() {
    global $dataFile;
    if (file_exists($dataFile)) {
        $content = file_get_contents($dataFile);
        return json_decode($content, true);
    }
    return [];
}

function writeData($data) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

$ledPairs = [
    ['green' => 'bunkerLow', 'red' => 'bunkerHigh'],
    ['green' => 'gate1Open', 'red' => 'gate1Alarm'],
    ['green' => 'gate2Open', 'red' => 'gate2Alarm'],
    ['green' => 'conveyor1On', 'red' => 'transport1Alarm'],
    ['green' => 'conveyor2On', 'red' => 'transport2Alarm'],
    ['green' => 'noria1On', 'red' => 'noria1Alarm'],
    ['green' => 'noria2On', 'red' => 'noria2Alarm'],
    ['green' => 'gateOpen', 'red' => 'gateClosed'],
    ['green' => 'dryingVent', 'red' => 'tempAlarm'],
    ['green' => 'petkus1On', 'red' => 'selfWarming'],
    ['green' => 'petkus2On', 'red' => 'humidityAlarm']
];

function generateRandomLeds($pairs) {
    $greenLeds = [];
    $redLeds = [];
    
    $allGreens = ['bunkerLow', 'dryingVent', 'gate1Open', 'gate2Open', 'conveyor1On', 
                  'conveyor2On', 'noria1On', 'noria2On', 'petkus1On', 'gateOpen', 'petkus2On'];
    $allReds = ['bunkerHigh', 'gateClosed', 'transport2Alarm', 'transport1Alarm', 
                'noria1Alarm', 'gate1Alarm', 'gate2Alarm', 'tempAlarm', 'noria2Alarm', 
                'humidityAlarm', 'selfWarming'];
    
    foreach ($allGreens as $led) {
        $greenLeds[$led] = false;
    }
    foreach ($allReds as $led) {
        $redLeds[$led] = false;
    }
    
    foreach ($pairs as $pair) {
        $random = rand(1, 100);
        
        if ($random <= 33) {
            // 33% - горит зеленая
            $greenLeds[$pair['green']] = true;
            $redLeds[$pair['red']] = false;
        } elseif ($random <= 66) {
            // 33% - горит красная
            $greenLeds[$pair['green']] = false;
            $redLeds[$pair['red']] = true;
        } else {
            // 34% - ничего не горит
            $greenLeds[$pair['green']] = false;
            $redLeds[$pair['red']] = false;
        }
    }
    
    return ['green' => $greenLeds, 'red' => $redLeds];
}

function updateIndicatorsByVentilation($ventilationType, $season = null) {
    $indicators = [
        'temperature' => 15,
        'humidity' => 15,
        'coolingTime' => 20,
        'dryingTime' => 1,
        'airSupply' => 150
    ];
    
    switch($ventilationType) {
        case 'Сушка зерна':
            $indicators['temperature'] = 15;
            $indicators['humidity'] = 15;
            $indicators['coolingTime'] = 20;
            break;
        
        case 'Ликвидация самосогревания':
            $indicators['temperature'] = rand(3, 7);
            $indicators['humidity'] = 15;
            break;
        
        case 'Профилактическое вентилирование':
            $indicators['temperature'] = 15;
            $indicators['humidity'] = 10;
            break;
        
        case 'Охлаждение свежеубранного зерна':
            $indicators['temperature'] = 15;
            $indicators['humidity'] = 15;
            $indicators['coolingTime'] = rand(18, 22);
            break;
    }
    
    if ($season) {
        switch($season) {
            case 'Лето':
                $indicators['temperature'] += 2;
                break;
            case 'Весна':
                $indicators['humidity'] += 2;
                break;
            case 'Зима':
                $indicators['temperature'] -= 3;
                break;
            case 'Осень':
                $indicators['humidity'] -= 3;
                break;
        }
    }
    
    return $indicators;
}

$method = $_SERVER['REQUEST_METHOD'];

$input = json_decode(file_get_contents('php://input'), true);

switch($method) {
    case 'GET':
        if (isset($_GET['action'])) {
            $data = readData();
            
            switch($_GET['action']) {
                case 'get_all':
                    // Возвращаем все данные
                    echo json_encode([
                        'success' => true,
                        'data' => $data
                    ]);
                    break;
                    
                case 'get_indicators':
                    echo json_encode([
                        'success' => true,
                        'data' => $data['indicators'] ?? [
                            'temperature' => 15,
                            'humidity' => 15,
                            'coolingTime' => 20,
                            'dryingTime' => 1,
                            'airSupply' => 150
                        ]
                    ]);
                    break;
                    
                case 'get_leds':
                    echo json_encode([
                        'success' => true,
                        'data' => $data['leds'] ?? ['green' => [], 'red' => []]
                    ]);
                    break;
                    
                case 'get_events':
                    echo json_encode([
                        'success' => true,
                        'data' => $data['events'] ?? []
                    ]);
                    break;
            }
        }
        break;
        
    case 'POST':
        if (isset($input['action'])) {
            $data = readData();
            
            switch($input['action']) {
                case 'update_ventilation':
                    $ventilationType = $input['ventilationType'];
                    $season = $input['season'] ?? null;
                    $grainType = $input['grainType'] ?? 'Сухая';
                    
                    $indicators = updateIndicatorsByVentilation($ventilationType, $season);
                    $data['currentVentilation'] = $ventilationType;
                    $data['currentSeason'] = $season;
                    $data['currentGrain'] = $grainType;
                    $data['indicators'] = $indicators;
                    
                    writeData($data);
                    
                    echo json_encode([
                        'success' => true,
                        'indicators' => $indicators
                    ]);
                    break;
                    
                case 'update_season':
                    $season = $input['season'];
                    $ventilationType = $data['currentVentilation'] ?? 'Сушка зерна';
                    
                    $indicators = updateIndicatorsByVentilation($ventilationType, $season);
                    $data['currentSeason'] = $season;
                    $data['indicators'] = $indicators;
                    
                    writeData($data);
                    
                    echo json_encode([
                        'success' => true,
                        'indicators' => $indicators
                    ]);
                    break;
                    
                case 'add_event':
                    // Добавляем событие в журнал
                    if (!isset($data['events'])) {
                        $data['events'] = [];
                    }
                    
                    array_unshift($data['events'], [
                        'name' => $input['name'],
                        'type' => $input['event_type'],
                        'date' => date('Y-m-d H:i:s'),
                        'description' => $input['description']
                    ]);
                    
                    // Оставляем только последние 50 событий
                    $data['events'] = array_slice($data['events'], 0, 50);
                    writeData($data);
                    
                    echo json_encode(['success' => true]);
                    break;
            }
        }
        break;
        
    case 'PUT':
        $data = readData();
        $newLeds = generateRandomLeds($ledPairs);
        $data['leds'] = $newLeds;
        
        if (rand(1, 100) <= 20) {
            $events = [
                ['name' => 'Температура (авария)', 'type' => 'alarm', 'description' => 'Превышение допустимой температуры'],
                ['name' => 'Бункер нижний уровень', 'type' => 'notification', 'description' => 'Достигнут нижний уровень бункера'],
                ['name' => 'Транспортер №1 (включен)', 'type' => 'notification', 'description' => 'Транспортер №1 запущен'],
                ['name' => 'Нория №1 (авария)', 'type' => 'alarm', 'description' => 'Остановка нории №1'],
                ['name' => 'Самосогревание', 'type' => 'alarm', 'description' => 'Обнаружено самосогревание зерна']
            ];
            
            $randomEvent = $events[array_rand($events)];
            
            if (!isset($data['events'])) {
                $data['events'] = [];
            }
            
            array_unshift($data['events'], [
                'name' => $randomEvent['name'],
                'type' => $randomEvent['type'],
                'date' => date('Y-m-d H:i:s'),
                'description' => $randomEvent['description']
            ]);
            
            $data['events'] = array_slice($data['events'], 0, 50);
        }
        
        writeData($data);
        
        echo json_encode([
            'success' => true,
            'leds' => $newLeds,
            'events' => $data['events'] ?? []
        ]);
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Неподдерживаемый метод']);
        break;
}
?>