import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';
import '../App.css';

const TransportControlPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gate1Mode, setGate1Mode] = useState<'manual' | 'auto'>('manual');
  const [gate2Mode, setGate2Mode] = useState<'manual' | 'auto'>('manual');
  const [gate3Mode, setGate3Mode] = useState<'manual' | 'auto'>('manual');
  const [transport1Mode, setTransport1Mode] = useState<'manual' | 'auto'>('manual');
  const [transport2Mode, setTransport2Mode] = useState<'manual' | 'auto'>('manual');
  const [bunkerLevel, setBunkerLevel] = useState<'upper' | 'lower'>('upper');

  const [noria1Mode, setNoria1Mode] = useState<'manual' | 'auto'>('manual');
  const [noria2Mode, setNoria2Mode] = useState<'manual' | 'auto'>('manual');
  const [noria1On, setNoria1On] = useState<boolean>(false);
  const [noria2On, setNoria2On] = useState<boolean>(false);

  const [dryerOn, setDryerOn] = useState<boolean>(false);
  
  const [petkus1Mode, setPetkus1Mode] = useState<'manual' | 'auto'>('manual');
  const [petkus2Mode, setPetkus2Mode] = useState<'manual' | 'auto'>('manual');

  const [fanMode, setFanMode] = useState<'manual' | 'auto'>('manual');
  
  const [gate1Open, setGate1Open] = useState<boolean>(false);
  const [gate2Open, setGate2Open] = useState<boolean>(false);
  const [gate3Open, setGate3Open] = useState<boolean>(false);
  const [transport1Open, setTransport1Open] = useState<boolean>(false);
  const [transport2Open, setTransport2Open] = useState<boolean>(false);

  const [greenLeds, setGreenLeds] = useState<any>({});
  const [redLeds, setRedLeds] = useState<any>({});
  
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await ApiService.getAllData();
      if (result.success && result.data) {
        if (result.data.leds) {
          setGreenLeds(result.data.leds.green || {});
          setRedLeds(result.data.leds.red || {});
        }
        if (result.data.events) {
          setEvents(result.data.events);
        }
      }
    };
    
    loadData();

    const unsubscribe = ApiService.subscribeToUpdates((data) => {
      if (data.leds) {
        setGreenLeds(data.leds.green);
        setRedLeds(data.leds.red);
      }
      if (data.events) {
        setEvents(data.events);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="control-page transport-page">
      <button className="back-btn" onClick={onBack}>НАЗАД</button>

      <div className="main-block transport-main-block">
        <div className="main-block-title">БЛОК УПРАВЛЕНИЯ ТРАНСПОРТИРОВКОЙ ЗЕРНА</div>
        <div className="transport-three-columns">
          <div className="transport-section-first">  
            <div className="transport-cards-row">
              <div className="transport-col">
                <div className="transport-title">Задвижка №1</div>
                <div className="transport-image">
                  <img src="/src/assets/Union (4).png" alt="Задвижка №1" />
                </div>
                <div className="transport-mode-group">
                  <button className={`transport-mode-btn ${gate1Mode === 'manual' ? 'active' : ''}`} onClick={() => setGate1Mode('manual')}>Ручной режим</button>
                  <button className={`transport-mode-btn ${gate1Mode === 'auto' ? 'active' : ''}`} onClick={() => setGate1Mode('auto')}>Автомат режим</button>
                </div>
                <div className="transport-vertical-group">
                  <button className={`transport-vertical-btn open ${gate1Open ? 'active' : ''}`} onClick={() => setGate1Open(true)}>Открыть</button>
                  <button className={`transport-vertical-btn close ${!gate1Open ? 'active' : ''}`} onClick={() => setGate1Open(false)}>Закрыть</button>
                </div>
              </div>

              <div className="transport-col">
                <div className="transport-title">Задвижка №2</div>
                <div className="transport-image">
                  <img src="/src/assets/Union (4).png" alt="Задвижка №2" />
                </div>
                <div className="transport-mode-group">
                  <button className={`transport-mode-btn ${gate2Mode === 'manual' ? 'active' : ''}`} onClick={() => setGate2Mode('manual')}>Ручной режим</button>
                  <button className={`transport-mode-btn ${gate2Mode === 'auto' ? 'active' : ''}`} onClick={() => setGate2Mode('auto')}>Автомат режим</button>
                </div>
                <div className="transport-vertical-group">
                  <button className={`transport-vertical-btn open ${gate2Open ? 'active' : ''}`} onClick={() => setGate2Open(true)}>Открыть</button>
                  <button className={`transport-vertical-btn close ${!gate2Open ? 'active' : ''}`} onClick={() => setGate2Open(false)}>Закрыть</button>
                </div>
              </div>

              <div className="transport-col-special">
                <div className="transport-title">Перекидной клапан</div>
                <div className="transport-image-special">
                  <img src="/src/assets/Union (5).png" alt="Перекидной клапан" />
                </div>
                <div className="transport-mode-group">
                  <button className={`transport-mode-btn ${gate3Mode === 'manual' ? 'active' : ''}`} onClick={() => setGate3Mode('manual')}>Ручной режим</button>
                  <button className={`transport-mode-btn ${gate3Mode === 'auto' ? 'active' : ''}`} onClick={() => setGate3Mode('auto')}>Автомат режим</button>
                </div>
                <div className="transport-vertical-group">
                  <button className={`transport-vertical-btn open ${gate3Open ? 'active' : ''}`} onClick={() => setGate3Open(true)}>Открыть</button>
                  <button className={`transport-vertical-btn close ${!gate3Open ? 'active' : ''}`} onClick={() => setGate3Open(false)}>Закрыть</button>
                </div>
              </div>
            </div>

            <div className="transport-cards-row">
              <div className="transport-col">
                <div className="transport-title">Транспорт №1</div>
                <div className="transport-image">
                  <img src="/src/assets/Union (8).png" alt="Транспорт №1" />
                </div>
                <div className="transport-mode-group">
                  <button className={`transport-mode-btn ${transport1Mode === 'manual' ? 'active' : ''}`} onClick={() => setTransport1Mode('manual')}>Ручной режим</button>
                  <button className={`transport-mode-btn ${transport1Mode === 'auto' ? 'active' : ''}`} onClick={() => setTransport1Mode('auto')}>Автомат режим</button>
                </div>
                <div className="transport-vertical-group">
                  <button className={`transport-vertical-btn open ${transport1Open ? 'active' : ''}`} onClick={() => setTransport1Open(true)}>Открыть</button>
                  <button className={`transport-vertical-btn close ${!transport1Open ? 'active' : ''}`} onClick={() => setTransport1Open(false)}>Закрыть</button>
                </div>
              </div>

              <div className="transport-col">
                <div className="transport-title">Транспорт №2</div>
                <div className="transport-image">
                  <img src="/src/assets/Union (8).png" alt="Транспорт №2" />
                </div>
                <div className="transport-mode-group">
                  <button className={`transport-mode-btn ${transport2Mode === 'manual' ? 'active' : ''}`} onClick={() => setTransport2Mode('manual')}>Ручной режим</button>
                  <button className={`transport-mode-btn ${transport2Mode === 'auto' ? 'active' : ''}`} onClick={() => setTransport2Mode('auto')}>Автомат режим</button>
                </div>
                <div className="transport-vertical-group">
                  <button className={`transport-vertical-btn open ${transport2Open ? 'active' : ''}`} onClick={() => setTransport2Open(true)}>Открыть</button>
                  <button className={`transport-vertical-btn close ${!transport2Open ? 'active' : ''}`} onClick={() => setTransport2Open(false)}>Закрыть</button>
                </div>
              </div>

              <div className="transport-col">
                <div className="transport-title">Бункер</div>
                <div className="transport-image">
                  <img src="/src/assets/Union (7).png" alt="Бункер" />
                </div>
                <div className="transport-mode-group">
                  <button className={`transport-mode-btn ${bunkerLevel === 'upper' ? 'active' : ''}`} onClick={() => setBunkerLevel('upper')}>Верхний уровень</button>
                  <button className={`transport-mode-btn ${bunkerLevel === 'lower' ? 'active' : ''}`} onClick={() => setBunkerLevel('lower')}>Нижний уровень</button>
                </div>
              </div>
            </div>
          </div>

          <div className="transport-section-second">
            <div className="transport-col-vertical">
              <div className="transport-title">Нория №1</div>
              <div className="transport-image noria-image">
                <img src="/src/assets/Union (6).png" alt="Нория №1" />
              </div>
              <div className="transport-mode-group">
                <button className={`transport-mode-btn ${noria1Mode === 'manual' ? 'active' : ''}`} onClick={() => setNoria1Mode('manual')}>Ручной режим</button>
                <button className={`transport-mode-btn ${noria1Mode === 'auto' ? 'active' : ''}`} onClick={() => setNoria1Mode('auto')}>Автомат режим</button>
              </div>
              <div className="transport-vertical-group">
                <button className={`transport-vertical-btn open ${noria1On ? 'active' : ''}`} onClick={() => setNoria1On(true)}>Включить</button>
                <button className={`transport-vertical-btn close ${!noria1On ? 'active' : ''}`} onClick={() => setNoria1On(false)}>Отключить</button>
              </div>
            </div>

            <div className="transport-col-vertical">
              <div className="transport-title">Нория №2</div>
              <div className="transport-image noria-image">
                <img src="/src/assets/Union (6).png" alt="Нория №2" />
              </div>
              <div className="transport-mode-group">
                <button className={`transport-mode-btn ${noria2Mode === 'manual' ? 'active' : ''}`} onClick={() => setNoria2Mode('manual')}>Ручной режим</button>
                <button className={`transport-mode-btn ${noria2Mode === 'auto' ? 'active' : ''}`} onClick={() => setNoria2Mode('auto')}>Автомат режим</button>
              </div>
              <div className="transport-vertical-group">
                <button className={`transport-vertical-btn open ${noria2On ? 'active' : ''}`} onClick={() => setNoria2On(true)}>Включить</button>
                <button className={`transport-vertical-btn close ${!noria2On ? 'active' : ''}`} onClick={() => setNoria2On(false)}>Отключить</button>
              </div>
            </div>

            <div className="transport-col-vertical">
              <div className="transport-title">Сушилка</div>
              <div className="transport-image dryer-image">
                <img src="/src/assets/Union (9).png" alt="Сушилка" />
              </div>
              <div className="transport-vertical-group">
                <button className={`transport-vertical-btn open ${dryerOn ? 'active' : ''}`} onClick={() => setDryerOn(true)}>Включить</button>
                <button className={`transport-vertical-btn close ${!dryerOn ? 'active' : ''}`} onClick={() => setDryerOn(false)}>Отключить</button>
              </div>
            </div>
          </div>

          <div className="transport-section-third">
            <div className="transport-clean-title">ОЧИСТКА И СОРТИРОВКА ЗЕРНА</div>
            <div className="transport-clean-row">
              <div className="transport-clean-col">
                <div className="transport-title">Петкус №1</div>
                <div className="transport-image">
                  <img src="/src/assets/Union (10).png" alt="Петкус №1" />
                </div>
                <div className="transport-mode-group">
                  <button className={`transport-mode-btn ${petkus1Mode === 'manual' ? 'active' : ''}`} onClick={() => setPetkus1Mode('manual')}>Ручной режим</button>
                  <button className={`transport-mode-btn ${petkus1Mode === 'auto' ? 'active' : ''}`} onClick={() => setPetkus1Mode('auto')}>Автомат режим</button>
                </div>
              </div>

              <div className="transport-clean-col">
                <div className="transport-title">Петкус №2</div>
                <div className="transport-image">
                  <img src="/src/assets/Union (10).png" alt="Петкус №2" />
                </div>
                <div className="transport-mode-group">
                  <button className={`transport-mode-btn ${petkus2Mode === 'manual' ? 'active' : ''}`} onClick={() => setPetkus2Mode('manual')}>Ручной режим</button>
                  <button className={`transport-mode-btn ${petkus2Mode === 'auto' ? 'active' : ''}`} onClick={() => setPetkus2Mode('auto')}>Автомат режим</button>
                </div>
              </div>
            </div>

            <div className="transport-clean-row-single">
              <div className="transport-clean-col-single">
                <div className="transport-title">Вентилятор</div>
                <div className="transport-image">
                  <img src="/src/assets/Union (11).png" alt="Вентилятор" />
                </div>
                <div className="transport-mode-group">
                  <button className={`transport-mode-btn ${fanMode === 'manual' ? 'active' : ''}`} onClick={() => setFanMode('manual')}>Ручной режим</button>
                  <button className={`transport-mode-btn ${fanMode === 'auto' ? 'active' : ''}`} onClick={() => setFanMode('auto')}>Автомат режим</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-blocks">
        <div className="bottom-block bottom-block-left">
          <div className="bottom-block-title">
            БЛОК АВАРИЙНО-ПРЕДУПРЕДИТЕЛЬНОЙ СИГНАЛИЗАЦИИ
          </div>
          
          <div className="alarm-section">
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.bunkerLow ? 'on' : 'off'}`} />
                <span className="alarm-text">Бункер нижний уровень</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.dryingVent ? 'on' : 'off'}`} />
                <span className="alarm-text">Сушка (вкл) Вентиляция</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.gate1Open ? 'on' : 'off'}`} />
                <span className="alarm-text">Задвижка №1 (открыта)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.gate2Open ? 'on' : 'off'}`} />
                <span className="alarm-text">Задвижка №2 (открыта)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.conveyor1On ? 'on' : 'off'}`} />
                <span className="alarm-text">Транспортер №1 (включен)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.conveyor2On ? 'on' : 'off'}`} />
                <span className="alarm-text">Транспортер №2 (включен)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.noria1On ? 'on' : 'off'}`} />
                <span className="alarm-text">Нория №1 (включена)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.noria2On ? 'on' : 'off'}`} />
                <span className="alarm-text">Нория №2 (включена)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.petkus1On ? 'on' : 'off'}`} />
                <span className="alarm-text">Петкус №1 (включен)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.gateOpen ? 'on' : 'off'}`} />
                <span className="alarm-text">Перекидной клапан (открыт)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.petkus2On ? 'on' : 'off'}`} />
                <span className="alarm-text">Петкус №2 (включен)</span>
              </div>
            </div>
            
            <div className="alarm-center-image">
              <img src="/src/assets/Union (3).png" alt="Union" />
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.bunkerHigh ? 'on' : 'off'}`} />
                <span className="alarm-text">Бункер верхний уровень</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.gateClosed ? 'on' : 'off'}`} />
                <span className="alarm-text">Перекидной клапан (закрыт)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.transport2Alarm ? 'on' : 'off'}`} />
                <span className="alarm-text">Транспорт №2 (авария)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.transport1Alarm ? 'on' : 'off'}`} />
                <span className="alarm-text">Транспорт №1 (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.noria1Alarm ? 'on' : 'off'}`} />
                <span className="alarm-text">Нория №1 (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.gate1Alarm ? 'on' : 'off'}`} />
                <span className="alarm-text">Задвижка №1 (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.gate2Alarm ? 'on' : 'off'}`} />
                <span className="alarm-text">Задвижка №2 (авария)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.tempAlarm ? 'on' : 'off'}`} />
                <span className="alarm-text">Температура (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.noria2Alarm ? 'on' : 'off'}`} />
                <span className="alarm-text">Нория №2 (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.humidityAlarm ? 'on' : 'off'}`} />
                <span className="alarm-text">Влажность (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.selfWarming ? 'on' : 'off'}`} />
                <span className="alarm-text">Самосогревание</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bottom-block bottom-block-right">
          <div className="bottom-block-title">
            ЖУРНАЛ СОБЫТИЙ
          </div>
          <div className="event-log-table-wrapper">
            <div className="event-log-table-container">
              <table className="event-log-table">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Дата</th>
                    <th>Описание</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                        Нет событий
                       </td>
                     </tr>
                  ) : (
                    events.map((event, index) => (
                      <tr key={index}>
                        <td>{event.name}</td>
                        <td>
                          <span className={`event-type ${event.type === 'alarm' ? 'alarm' : 'notification'}`}>
                            {event.type === 'alarm' ? 'Авария' : 'Уведомление'}
                          </span>
                        </td>
                        <td>{event.date}</td>
                        <td>{event.description}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportControlPage;