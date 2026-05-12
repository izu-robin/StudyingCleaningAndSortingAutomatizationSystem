import LocalStorageService from './localStorageService';

const USE_PHP = false; 

class ApiService {
    static async getAllData() {
        if (USE_PHP) {
            try {
                const response = await fetch(`http://localhost:8000/api.php?action=get_all`);
                return await response.json();
            } catch (error) {
                return { success: false, data: null };
            }
        } else {
            return { success: true, data: LocalStorageService.getAllData() };
        }
    }

    static async saveIndicators(values: any) {
        if (USE_PHP) {
            try {
                const response = await fetch(`http://localhost:8000/api.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'save_indicators', values })
                });
                return await response.json();
            } catch (error) {
                return { success: false };
            }
        } else {
            return await LocalStorageService.saveIndicators(values);
        }
    }
    
    static async loadIndicators() {
        if (USE_PHP) {
            try {
                const response = await fetch(`http://localhost:8000/api.php?action=get_indicators`);
                return await response.json();
            } catch (error) {
                return { success: false, data: null };
            }
        } else {
            return await LocalStorageService.loadIndicators();
        }
    }
    
    static async saveLeds(greenLeds: any, redLeds: any) {
        if (USE_PHP) {
            try {
                const response = await fetch(`http://localhost:8000/api.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'save_leds', values: { green: greenLeds, red: redLeds } })
                });
                return await response.json();
            } catch (error) {
                return { success: false };
            }
        } else {
            return await LocalStorageService.saveLeds(greenLeds, redLeds);
        }
    }
    
    static async addEvent(name: string, eventType: string, description: string) {
        if (USE_PHP) {
            try {
                const response = await fetch(`http://localhost:8000/api.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'add_event', name, event_type: eventType, description })
                });
                return await response.json();
            } catch (error) {
                return { success: false };
            }
        } else {
            return await LocalStorageService.addEvent(name, eventType, description);
        }
    }

    static async updateVentilation(ventilationType: string, season: string, grainType: string) {
        if (USE_PHP) {
            try {
                const response = await fetch(`http://localhost:8000/api.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        action: 'update_ventilation',
                        ventilationType, 
                        season, 
                        grainType 
                    })
                });
                return await response.json();
            } catch (error) {
                return { success: false };
            }
        } else {
            return await LocalStorageService.updateVentilation(ventilationType, season, grainType);
        }
    }

    static async updateSeason(season: string) {
        if (USE_PHP) {
            try {
                const response = await fetch(`http://localhost:8000/api.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        action: 'update_season',
                        season 
                    })
                });
                return await response.json();
            } catch (error) {
                return { success: false };
            }
        } else {
            return await LocalStorageService.updateSeason(season);
        }
    }

    static subscribeToUpdates(callback: (data: any) => void) {
        // Всегда используем localStorage версию, так как USE_PHP = false
        return LocalStorageService.subscribeToUpdates(callback);
    }
}

export default ApiService;