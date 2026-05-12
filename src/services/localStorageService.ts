const ledPairs = [
  { green: 'bunkerLow', red: 'bunkerHigh' },
  { green: 'gate1Open', red: 'gate1Alarm' },
  { green: 'gate2Open', red: 'gate2Alarm' },
  { green: 'conveyor1On', red: 'transport1Alarm' },
  { green: 'conveyor2On', red: 'transport2Alarm' },
  { green: 'noria1On', red: 'noria1Alarm' },
  { green: 'noria2On', red: 'noria2Alarm' },
  { green: 'gateOpen', red: 'gateClosed' },
  { green: 'dryingVent', red: 'tempAlarm' },
  { green: 'petkus1On', red: 'selfWarming' },
  { green: 'petkus2On', red: 'humidityAlarm' }
];

function generateRandomLeds() {
  const allGreens = ['bunkerLow', 'dryingVent', 'gate1Open', 'gate2Open', 'conveyor1On', 
                     'conveyor2On', 'noria1On', 'noria2On', 'petkus1On', 'gateOpen', 'petkus2On'];
  const allReds = ['bunkerHigh', 'gateClosed', 'transport2Alarm', 'transport1Alarm', 
                   'noria1Alarm', 'gate1Alarm', 'gate2Alarm', 'tempAlarm', 'noria2Alarm', 
                   'humidityAlarm', 'selfWarming'];
  
  const greenLeds: any = {};
  const redLeds: any = {};
  
  allGreens.forEach(led => { greenLeds[led] = false; });
  allReds.forEach(led => { redLeds[led] = false; });
  
  ledPairs.forEach(pair => {
    const random = Math.random();
    
    if (random < 0.33) {
      greenLeds[pair.green] = true;
      redLeds[pair.red] = false;
    } else if (random < 0.66) {
      greenLeds[pair.green] = false;
      redLeds[pair.red] = true;
    } else {
      greenLeds[pair.green] = false;
      redLeds[pair.red] = false;
    }
  });
  
  return { green: greenLeds, red: redLeds };
}

function updateIndicatorsByVentilation(ventilationType: string, season: string = 'Осень') {
  let indicators: any = {
    temperature: 15,
    humidity: 15,
    coolingTime: 20,
    dryingTime: 1,
    airSupply: 150
  };
  
  switch(ventilationType) {
    case 'Сушка зерна':
      indicators.temperature = 15;
      indicators.humidity = 15;
      indicators.coolingTime = 20;
      break;
    case 'Ликвидация самосогревания':
      indicators.temperature = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
      indicators.humidity = 15;
      break;
    case 'Профилактическое вентилирование':
      indicators.temperature = 15;
      indicators.humidity = 10;
      break;
    case 'Охлаждение свежеубранного зерна':
      indicators.temperature = 15;
      indicators.humidity = 15;
      indicators.coolingTime = Math.floor(Math.random() * (22 - 18 + 1)) + 18;
      break;
  }
  
  switch(season) {
    case 'Лето':
      indicators.temperature += 2;
      break;
    case 'Весна':
      indicators.humidity += 2;
      break;
    case 'Зима':
      indicators.temperature -= 3;
      break;
    case 'Осень':
      indicators.humidity -= 3;
      break;
  }
  
  return indicators;
}

class LocalStorageService {
   private static updateInterval: number | null = null;
  private static listeners: Array<(data: any) => void> = [];

  static getAllData() {
    const defaultData = {
      indicators: { temperature: 15, humidity: 15, coolingTime: 20, dryingTime: 1, airSupply: 150 },
      leds: { green: {}, red: {} },
      events: [],
      currentVentilation: 'Сушка зерна',
      currentSeason: 'Осень',
      currentGrain: 'Сухая'
    };
    
    const stored = localStorage.getItem('grain_data');
    if (stored) {
      return { ...defaultData, ...JSON.parse(stored) };
    }
    return defaultData;
  }

  static async saveIndicators(values: any) {
    const data = this.getAllData();
    data.indicators = values;
    localStorage.setItem('grain_data', JSON.stringify(data));
    return { success: true };
  }

  static async loadIndicators() {
    const data = this.getAllData();
    return { success: true, data: data.indicators };
  }

  static async saveLeds(greenLeds: any, redLeds: any) {
    const data = this.getAllData();
    data.leds = { green: greenLeds, red: redLeds };
    localStorage.setItem('grain_data', JSON.stringify(data));
    return { success: true };
  }

  static async addEvent(name: string, eventType: string, description: string) {
    const data = this.getAllData();
    if (!data.events) data.events = [];
    
    data.events.unshift({
      name,
      type: eventType,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      description
    });
    
    data.events = data.events.slice(0, 50);
    localStorage.setItem('grain_data', JSON.stringify(data));
    return { success: true };
  }

  static async updateVentilation(ventilationType: string, season: string, grainType: string) {
    const data = this.getAllData();
    const indicators = updateIndicatorsByVentilation(ventilationType, season);
    
    data.currentVentilation = ventilationType;
    data.currentSeason = season;
    data.currentGrain = grainType;
    data.indicators = indicators;
    
    localStorage.setItem('grain_data', JSON.stringify(data));
    return { success: true, indicators };
  }

  static async updateSeason(season: string) {
    const data = this.getAllData();
    const indicators = updateIndicatorsByVentilation(data.currentVentilation, season);
    
    data.currentSeason = season;
    data.indicators = indicators;
    
    localStorage.setItem('grain_data', JSON.stringify(data));
    return { success: true, indicators };
  }

  static async refreshLeds() {
    const data = this.getAllData();
    const newLeds = generateRandomLeds();
    data.leds = newLeds;
    
    if (Math.random() <= 0.2) {
      const eventsList = [
        { name: 'Температура (авария)', type: 'alarm', description: 'Превышение допустимой температуры' },
        { name: 'Бункер нижний уровень', type: 'notification', description: 'Достигнут нижний уровень бункера' },
        { name: 'Транспортер №1 (включен)', type: 'notification', description: 'Транспортер №1 запущен' },
        { name: 'Нория №1 (авария)', type: 'alarm', description: 'Остановка нории №1' },
        { name: 'Самосогревание', type: 'alarm', description: 'Обнаружено самосогревание зерна' }
      ];
      
      const randomEvent = eventsList[Math.floor(Math.random() * eventsList.length)];
      
      if (!data.events) data.events = [];
      data.events.unshift({
        name: randomEvent.name,
        type: randomEvent.type,
        date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        description: randomEvent.description
      });
      
      data.events = data.events.slice(0, 50);
    }
    
    localStorage.setItem('grain_data', JSON.stringify(data));
    return { success: true, leds: newLeds, events: data.events };
  }

  static subscribeToUpdates(callback: (data: any) => void) {
    this.listeners.push(callback);
    
    if (!this.updateInterval) {
      this.updateInterval = setInterval(async () => {
        const result = await this.refreshLeds();
        if (result.success) {
          this.listeners.forEach(listener => listener(result));
        }
      }, 1000);
    }
    
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
      if (this.listeners.length === 0 && this.updateInterval) {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
      }
    };
  }
}

export default LocalStorageService;