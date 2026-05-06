import React, { useState } from 'react';
import '../App.css';

const ControlPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // Состояния для выбранных кнопок (только один выбор в каждой секции)
  const [selectedGrain, setSelectedGrain] = useState<string>('Сухая');
  const [selectedVentilation, setSelectedVentilation] = useState<string>('Охлаждение свежеубранного зерна');
  const [selectedSeason, setSelectedSeason] = useState<string>('Осень');

  const [temperature, setTemperature] = useState<number>(18);
  const [coolingTime, setCoolingTime] = useState<number>(36);
  const [humidity, setHumidity] = useState<number>(15.5);
  const [dryingTime, setDryingTime] = useState<number>(2);
  const [airSupply, setAirSupply] = useState<number>(150);

  const grainTypes = [
    { name: 'Сухая', subtitle: 'влажность до 14%' },
    { name: 'Средней сухости', subtitle: 'влажность 14,5-15,5%' },
    { name: 'Влажное', subtitle: 'влажность 15,5-17%' },
    { name: 'Сырое', subtitle: 'влажность более 17%' }
  ];

  const ventilationTypes = [
    { name: 'Охлаждение\nсвежеубранного зерна', subtitle: '100-150 м³/ч*т (24-48 ч)' },
    { name: 'Профилактическое\nвентилирование', subtitle: '30-50 м³/ч*т (периодически каждые 1-3 месяца по 2 часа)' },
    { name: 'Ликвидация\nсамосогревания', subtitle: '150-200 м³/ч*т (до нормализации 72 часа)' },
    { name: 'Сушка зерна', subtitle: '200-300 м³/ч*т (по необходимости)' }
  ];

  const seasonTypes = [
    { name: 'Осень', subtitle: '8-12 град. C' },
    { name: 'Зима', subtitle: '5-10 град. C' },
    { name: 'Весна', subtitle: '6-10 град. C' },
    { name: 'Лето', subtitle: '10-15 град. C' }
  ];

  const [greenLeds, setGreenLeds] = useState({
    bunkerLow: false,
    dryingVent: false,
    gate2Open: false,
    conveyor1On: false,
    conveyor2On: false,
    noria1On: false,
    noria2On: false,
    petkus1On: false,
    gateOpen: false,
    petkus2On: false
  });

  const [redLeds, setRedLeds] = useState({
    bunkerHigh: false,
    gateClosed: false,
    transport2Alarm: false,
    transport1Alarm: false,
    noria1Alarm: false,
    gate1Alarm: false,
    gate2Alarm: false,
    tempAlarm: false,
    noria2Alarm: false,
    humidityAlarm: false,
    selfWarming: false
  });

  const getPercentageFromScale = (value: number, scaleValues: number[]): number => {
    const min = Math.min(...scaleValues);
    const max = Math.max(...scaleValues);
    return ((value - min) / (max - min)) * 100;
  };

  return (
<div className="control-page control-page-style">
      <button className="back-btn" onClick={onBack}>НАЗАД</button>

      <div className="main-block">
        <div className="main-block-title">БЛОК КОНТРОЛЯ ТЕМПЕРАТУРЫ ЗЕРНА</div>

        <div className="sections-row">
          
          <div className="section section-left">
            <div className="subsection">
              <div className="subsection-title">ТИП ЗЕРНА</div>
              <div className="buttons-wrapper">
                <div className="buttons-container">
                  {grainTypes.map((grain) => (
                    <button
                      key={grain.name}
                      className={`action-button ${selectedGrain === grain.name ? 'active' : ''}`}
                      onClick={() => setSelectedGrain(grain.name)}
                    >
                      {grain.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="subtitles-container">
                {grainTypes.map((grain) => (
                  <div key={grain.name} className="button-subtitle">
                    {grain.subtitle}
                  </div>
                ))}
              </div>
            </div>

            <div className="subsection">
              <div className="subsection-title">ВЕНТИЛЯЦИЯ ЗЕРНА</div>
              <div className="buttons-wrapper">
                <div className="buttons-container ventilation-container">
                  {ventilationTypes.map((vent) => (
                    <button
                      key={vent.name}
                      className={`action-button ventilation-button ${selectedVentilation === vent.name ? 'active' : ''}`}
                      onClick={() => setSelectedVentilation(vent.name)}
                    >
                      {vent.name.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < vent.name.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </button>
                  ))}
                </div>
              </div>
              <div className="subtitles-container ventilation-subtitles">
                {ventilationTypes.map((vent) => (
                  <div key={vent.name} className="button-subtitle">
                    {vent.subtitle}
                  </div>
                ))}
              </div>
            </div>

            <div className="subsection">
              <div className="subsection-title">ВРЕМЯ ГОДА</div>
              <div className="buttons-wrapper">
                <div className="buttons-container">
                  {seasonTypes.map((season) => (
                    <button
                      key={season.name}
                      className={`action-button ${selectedSeason === season.name ? 'active' : ''}`}
                      onClick={() => setSelectedSeason(season.name)}
                    >
                      {season.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="subtitles-container">
                {seasonTypes.map((season) => (
                  <div key={season.name} className="button-subtitle">
                    {season.subtitle}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="section section-center">
            <div className="subsection-title">ЦИФРОВЫЕ ИНДИКАТОРЫ</div>
            
            <div className="indicators-row">
              <div className="indicator-wrapper">
                <div className="indicator-label">Температура, C</div>
                <div className="indicator-bar-container">
                  <div className="indicator-bar-bg">
                    <div 
                      className="indicator-bar-fill" 
                      style={{ width: `${getPercentageFromScale(temperature, [0, 10, 20, 30])}%` }}
                    />
                  </div>
                  <div className="indicator-value-box">
                    <span className="indicator-value">{temperature}</span>
                  </div>
                </div>
                <div className="indicator-scale">
                  <div className="scale-mark" style={{ left: '0%' }}>0</div>
                  <div className="scale-mark" style={{ left: '33.33%' }}>10</div>
                  <div className="scale-mark" style={{ left: '66.66%' }}>20</div>
                  <div className="scale-mark" style={{ left: '100%' }}>30</div>
                </div>
              </div>

              <div className="indicator-wrapper">
                <div className="indicator-label">Влажность, %</div>
                <div className="indicator-bar-container">
                  <div className="indicator-bar-bg">
                    <div 
                      className="indicator-bar-fill" 
                      style={{ width: `${getPercentageFromScale(humidity, [17, 16, 15, 14])}%` }}
                    />
                  </div>
                  <div className="indicator-value-box">
                    <span className="indicator-value">{humidity}</span>
                  </div>
                </div>
                <div className="indicator-scale">
                  <div className="scale-mark" style={{ left: '0%' }}>17</div>
                  <div className="scale-mark" style={{ left: '33.33%' }}>16</div>
                  <div className="scale-mark" style={{ left: '66.66%' }}>15</div>
                  <div className="scale-mark" style={{ left: '100%' }}>14</div>
                </div>
              </div>
            </div>

            <div className="indicators-row">
              <div className="indicator-wrapper">
                <div className="indicator-label">Время охлаждения, ч</div>
                <div className="indicator-bar-container">
                  <div className="indicator-bar-bg">
                    <div 
                      className="indicator-bar-fill" 
                      style={{ width: `${getPercentageFromScale(coolingTime, [0, 24, 48, 72])}%` }}
                    />
                  </div>
                  <div className="indicator-value-box">
                    <span className="indicator-value">{coolingTime}</span>
                  </div>
                </div>
                <div className="indicator-scale">
                  <div className="scale-mark" style={{ left: '0%' }}>0</div>
                  <div className="scale-mark" style={{ left: '33.33%' }}>24</div>
                  <div className="scale-mark" style={{ left: '66.66%' }}>48</div>
                  <div className="scale-mark" style={{ left: '100%' }}>72</div>
                </div>
              </div>

              <div className="indicator-wrapper">
                <div className="indicator-label">Время сушки, ч</div>
                <div className="indicator-bar-container">
                  <div className="indicator-bar-bg">
                    <div 
                      className="indicator-bar-fill" 
                      style={{ width: `${getPercentageFromScale(dryingTime, [0, 1, 2, 3])}%` }}
                    />
                  </div>
                  <div className="indicator-value-box">
                    <span className="indicator-value">{dryingTime}</span>
                  </div>
                </div>
                <div className="indicator-scale">
                  <div className="scale-mark" style={{ left: '0%' }}>0</div>
                  <div className="scale-mark" style={{ left: '33.33%' }}>1</div>
                  <div className="scale-mark" style={{ left: '66.66%' }}>2</div>
                  <div className="scale-mark" style={{ left: '100%' }}>3</div>
                </div>
              </div>
            </div>

            <div className="indicators-row single-center">
              <div className="indicator-wrapper center-indicator">
                <div className="indicator-label">Удельная подача воздуха, м³/ч*т</div>
                <div className="indicator-bar-container">
                  <div className="indicator-bar-bg">
                    <div 
                      className="indicator-bar-fill" 
                      style={{ width: `${getPercentageFromScale(airSupply, [0, 100, 200, 300])}%` }}
                    />
                  </div>
                  <div className="indicator-value-box">
                    <span className="indicator-value">{airSupply}</span>
                  </div>
                </div>
                <div className="indicator-scale">
                  <div className="scale-mark" style={{ left: '0%' }}>0</div>
                  <div className="scale-mark" style={{ left: '33.33%' }}>100</div>
                  <div className="scale-mark" style={{ left: '66.66%' }}>200</div>
                  <div className="scale-mark" style={{ left: '100%' }}>300</div>
                </div>
              </div>
            </div>
          </div>

          <div className="section section-right no-bg">
            <div className="right-buttons">
              <button className="right-btn start-btn">Старт</button>
              <button className="right-btn stop-btn">Стоп</button>
              <button className="right-btn repair-btn">Ремонт</button>
            </div>
            <div className="right-logo">
              <img src="/src/assets/Union.png" alt="Union" />
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
                <div 
                  className={`alarm-led green-led ${greenLeds.bunkerLow ? 'on' : 'off'}`}
                  onClick={() => setGreenLeds(prev => ({ ...prev, bunkerLow: !prev.bunkerLow }))}
                />
                <span className="alarm-text">Бункер нижний уровень</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led green-led ${greenLeds.dryingVent ? 'on' : 'off'}`}
                  onClick={() => setGreenLeds(prev => ({ ...prev, dryingVent: !prev.dryingVent }))}
                />
                <span className="alarm-text">Сушка (вкл) Вентиляция</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led green-led ${greenLeds.gate2Open ? 'on' : 'off'}`}
                  onClick={() => setGreenLeds(prev => ({ ...prev, gate2Open: !prev.gate2Open }))}
                />
                <span className="alarm-text">Задвижка №1 (открыта)</span>
              </div>
               <div className="alarm-item">
                <div 
                  className={`alarm-led green-led ${greenLeds.gate2Open ? 'on' : 'off'}`}
                  onClick={() => setGreenLeds(prev => ({ ...prev, gate2Open: !prev.gate2Open }))}
                />
                <span className="alarm-text">Задвижка №2 (открыта)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div 
                  className={`alarm-led green-led ${greenLeds.conveyor1On ? 'on' : 'off'}`}
                  onClick={() => setGreenLeds(prev => ({ ...prev, conveyor1On: !prev.conveyor1On }))}
                />
                <span className="alarm-text">Транспортер №1 (включен)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led green-led ${greenLeds.conveyor2On ? 'on' : 'off'}`}
                  onClick={() => setGreenLeds(prev => ({ ...prev, conveyor2On: !prev.conveyor2On }))}
                />
                <span className="alarm-text">Транспортер №2 (включен)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led green-led ${greenLeds.noria1On ? 'on' : 'off'}`}
                  onClick={() => setGreenLeds(prev => ({ ...prev, noria1On: !prev.noria1On }))}
                />
                <span className="alarm-text">Нория №1 (включена)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led green-led ${greenLeds.noria2On ? 'on' : 'off'}`}
                  onClick={() => setGreenLeds(prev => ({ ...prev, noria2On: !prev.noria2On }))}
                />
                <span className="alarm-text">Нория №2 (включена)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div 
                  className={`alarm-led green-led ${greenLeds.petkus1On ? 'on' : 'off'}`}
                  onClick={() => setGreenLeds(prev => ({ ...prev, petkus1On: !prev.petkus1On }))}
                />
                <span className="alarm-text">Петкус №1 (включен)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led green-led ${greenLeds.gateOpen ? 'on' : 'off'}`}
                  onClick={() => setGreenLeds(prev => ({ ...prev, gateOpen: !prev.gateOpen }))}
                />
                <span className="alarm-text">Перекидной клапан (открыт)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led green-led ${greenLeds.petkus2On ? 'on' : 'off'}`}
                  onClick={() => setGreenLeds(prev => ({ ...prev, petkus2On: !prev.petkus2On }))}
                />
                <span className="alarm-text">Петкус №2 (включен)</span>
              </div>
            </div>
            
            <div className="alarm-center-image">
              <img src="/src/assets/Union (3).png" alt="Union" />
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div 
                  className={`alarm-led red-led ${redLeds.bunkerHigh ? 'on' : 'off'}`}
                  onClick={() => setRedLeds(prev => ({ ...prev, bunkerHigh: !prev.bunkerHigh }))}
                />
                <span className="alarm-text">Бункер верхний уровень</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led red-led ${redLeds.gateClosed ? 'on' : 'off'}`}
                  onClick={() => setRedLeds(prev => ({ ...prev, gateClosed: !prev.gateClosed }))}
                />
                <span className="alarm-text">Перекидной клапан (закрыт)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led red-led ${redLeds.transport2Alarm ? 'on' : 'off'}`}
                  onClick={() => setRedLeds(prev => ({ ...prev, transport2Alarm: !prev.transport2Alarm }))}
                />
                <span className="alarm-text">Транспорт №2 (авария)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div 
                  className={`alarm-led red-led ${redLeds.transport1Alarm ? 'on' : 'off'}`}
                  onClick={() => setRedLeds(prev => ({ ...prev, transport1Alarm: !prev.transport1Alarm }))}
                />
                <span className="alarm-text">Транспорт №1 (авария)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led red-led ${redLeds.noria1Alarm ? 'on' : 'off'}`}
                  onClick={() => setRedLeds(prev => ({ ...prev, noria1Alarm: !prev.noria1Alarm }))}
                />
                <span className="alarm-text">Нория №1 (авария)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led red-led ${redLeds.gate1Alarm ? 'on' : 'off'}`}
                  onClick={() => setRedLeds(prev => ({ ...prev, gate1Alarm: !prev.gate1Alarm }))}
                />
                <span className="alarm-text">Задвижка №1 (авария)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led red-led ${redLeds.gate2Alarm ? 'on' : 'off'}`}
                  onClick={() => setRedLeds(prev => ({ ...prev, gate2Alarm: !prev.gate2Alarm }))}
                />
                <span className="alarm-text">Задвижка №2 (авария)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div 
                  className={`alarm-led red-led ${redLeds.tempAlarm ? 'on' : 'off'}`}
                  onClick={() => setRedLeds(prev => ({ ...prev, tempAlarm: !prev.tempAlarm }))}
                />
                <span className="alarm-text">Температура (авария)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led red-led ${redLeds.noria2Alarm ? 'on' : 'off'}`}
                  onClick={() => setRedLeds(prev => ({ ...prev, noria2Alarm: !prev.noria2Alarm }))}
                />
                <span className="alarm-text">Нория №2 (авария)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led red-led ${redLeds.humidityAlarm ? 'on' : 'off'}`}
                  onClick={() => setRedLeds(prev => ({ ...prev, humidityAlarm: !prev.humidityAlarm }))}
                />
                <span className="alarm-text">Влажность (авария)</span>
              </div>
              <div className="alarm-item">
                <div 
                  className={`alarm-led red-led ${redLeds.selfWarming ? 'on' : 'off'}`}
                  onClick={() => setRedLeds(prev => ({ ...prev, selfWarming: !prev.selfWarming }))}
                />
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
          <tr>
            <td>Бункер нижний уровень</td>
            <td><span className="event-type notification">Уведомление</span></td>
            <td>2026-05-05 14:30:25</td>
            <td>Достигнут нижний уровень бункера</td>
          </tr>
          <tr>
            <td>Температура (авария)</td>
            <td><span className="event-type alarm">Авария</span></td>
            <td>2026-05-05 13:15:10</td>
            <td>Превышение допустимой температуры</td>
          </tr>
          <tr>
            <td>Транспортер №1 (включен)</td>
            <td><span className="event-type notification">Уведомление</span></td>
            <td>2026-05-05 12:00:00</td>
            <td>Транспортер №1 запущен</td>
          </tr>
          <tr>
            <td>Нория №1 (авария)</td>
            <td><span className="event-type alarm">Авария</span></td>
            <td>2026-05-05 10:45:30</td>
            <td>Остановка нории №1</td>
          </tr>
          <tr>
            <td>Задвижка №2 (открыта)</td>
            <td><span className="event-type notification">Уведомление</span></td>
            <td>2026-05-05 09:20:15</td>
            <td>Задвижка №2 открыта</td>
          </tr>
          <tr>
            <td>Влажность (авария)</td>
            <td><span className="event-type alarm">Авария</span></td>
            <td>2026-05-05 08:00:00</td>
            <td>Превышение допустимой влажности</td>
          </tr>
          <tr>
            <td>Самосогревание</td>
            <td><span className="event-type alarm">Авария</span></td>
            <td>2026-05-04 22:30:00</td>
            <td>Обнаружено самосогревание зерна</td>
          </tr>
          <tr>
            <td>Перекидной клапан (открыт)</td>
            <td><span className="event-type notification">Уведомление</span></td>
            <td>2026-05-04 18:45:00</td>
            <td>Клапан перекидной открыт</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
        
      </div>
    </div>
  );
};

export default ControlPage;