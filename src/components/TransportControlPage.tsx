import React, { useState } from 'react';
import '../App.css';

const TransportControlPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // Состояния для выбранных режимов (ручной/автомат)
  const [gate1Mode, setGate1Mode] = useState<'manual' | 'auto'>('manual');
 const [gate2Mode, setGate2Mode] = useState<'manual' | 'auto'>('manual');
  const [gate3Mode, setGate3Mode] = useState<'manual' | 'auto'>('manual');
  const [transport1Mode, setTransport1Mode] = useState<'manual' | 'auto'>('manual');
  const [transport2Mode, setTransport2Mode] = useState<'manual' | 'auto'>('manual');
  const [bunkerLevel, setBunkerLevel] = useState<'upper' | 'lower'>('upper');

  // Состояния для Нория №1 и №2
  const [noria1Mode, setNoria1Mode] = useState<'manual' | 'auto'>('manual');
  const [noria2Mode, setNoria2Mode] = useState<'manual' | 'auto'>('manual');
  const [noria1On, setNoria1On] = useState<boolean>(false);
  const [noria2On, setNoria2On] = useState<boolean>(false);

  // Состояние для Сушилки
  const [dryerOn, setDryerOn] = useState<boolean>(false);
  
  // Состояния для Петкус №1 и №2
  const [petkus1Mode, setPetkus1Mode] = useState<'manual' | 'auto'>('manual');
  const [petkus2Mode, setPetkus2Mode] = useState<'manual' | 'auto'>('manual');

  // Состояние для Вентилятора
  const [fanMode, setFanMode] = useState<'manual' | 'auto'>('manual');
  
  // Состояния для кнопок Открыть/Закрыть
  const [gate1Open, setGate1Open] = useState<boolean>(false);
  const [gate2Open, setGate2Open] = useState<boolean>(false);
  const [gate3Open, setGate3Open] = useState<boolean>(false);
  const [transport1Open, setTransport1Open] = useState<boolean>(false);
  const [transport2Open, setTransport2Open] = useState<boolean>(false);

  // Состояния для зеленых лампочек
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

  // Состояния для красных лампочек
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

  return (
    <div className="control-page transport-page">
      <button className="back-btn" onClick={onBack}>НАЗАД</button>

     {/* ПЕРВЫЙ БОЛЬШОЙ БЛОК */}
<div className="main-block transport-main-block">
  <div className="main-block-title">БЛОК УПРАВЛЕНИЯ ТРАНСПОРТИРОВКОЙ ЗЕРНА</div>
  
  {/* ОДИН ОБЩИЙ ФОН ДЛЯ ВСЕХ ТРЕХ СЕКЦИЙ */}
  <div className="transport-three-columns">
    
    {/* ПЕРВАЯ СЕКЦИЯ - два ряда сверху вниз */}
    <div className="transport-section-first">
      
      {/* Ряд 1: Задвижка №1, Задвижка №2, Перекидной клапан */}
      <div className="transport-cards-row">
        {/* Задвижка №1 */}
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

        {/* Задвижка №2 */}
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

        {/* Перекидной клапан */}
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

      {/* Ряд 2: Транспорт №1, Транспорт №2, Бункер */}
      <div className="transport-cards-row">
        {/* Транспорт №1 */}
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

        {/* Транспорт №2 */}
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

        {/* Бункер */}
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

    {/* ВТОРАЯ СЕКЦИЯ - три карточки слева направо */}
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

    {/* ТРЕТЬЯ СЕКЦИЯ - ОЧИСТКА И СОРТИРОВКА ЗЕРНА */}
    <div className="transport-section-third">
      <div className="transport-clean-title">ОЧИСТКА И СОРТИРОВКА ЗЕРНА</div>
      
      {/* Ряд 1: Петкус №1 и Петкус №2 */}
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

      {/* Ряд 2: Вентилятор (по центру) */}
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

      {/* НИЖНЯЯ ЧАСТЬ */}
      <div className="bottom-blocks">
        
        {/* Левый нижний блок */}
        <div className="bottom-block bottom-block-left">
          <div className="bottom-block-title">
            БЛОК АВАРИЙНО-ПРЕДУПРЕДИТЕЛЬНОЙ<br />
            СИГНАЛИЗАЦИИ
          </div>
          
          <div className="alarm-section">
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.bunkerLow ? 'on' : 'off'}`} onClick={() => setGreenLeds(prev => ({ ...prev, bunkerLow: !prev.bunkerLow }))} />
                <span className="alarm-text">Бункер нижний уровень</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.dryingVent ? 'on' : 'off'}`} onClick={() => setGreenLeds(prev => ({ ...prev, dryingVent: !prev.dryingVent }))} />
                <span className="alarm-text">Сушка (вкл) Вентиляция</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.gate2Open ? 'on' : 'off'}`} onClick={() => setGreenLeds(prev => ({ ...prev, gate2Open: !prev.gate2Open }))} />
                <span className="alarm-text">Задвижка №2 (открыта)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.conveyor1On ? 'on' : 'off'}`} onClick={() => setGreenLeds(prev => ({ ...prev, conveyor1On: !prev.conveyor1On }))} />
                <span className="alarm-text">Транспортер №1 (включен)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.conveyor2On ? 'on' : 'off'}`} onClick={() => setGreenLeds(prev => ({ ...prev, conveyor2On: !prev.conveyor2On }))} />
                <span className="alarm-text">Транспортер №2 (включен)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.noria1On ? 'on' : 'off'}`} onClick={() => setGreenLeds(prev => ({ ...prev, noria1On: !prev.noria1On }))} />
                <span className="alarm-text">Нория №1 (включена)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.noria2On ? 'on' : 'off'}`} onClick={() => setGreenLeds(prev => ({ ...prev, noria2On: !prev.noria2On }))} />
                <span className="alarm-text">Нория №2 (включена)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.petkus1On ? 'on' : 'off'}`} onClick={() => setGreenLeds(prev => ({ ...prev, petkus1On: !prev.petkus1On }))} />
                <span className="alarm-text">Петкус №1 (включен)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.gateOpen ? 'on' : 'off'}`} onClick={() => setGreenLeds(prev => ({ ...prev, gateOpen: !prev.gateOpen }))} />
                <span className="alarm-text">Перекидной клапан (открыт)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.petkus2On ? 'on' : 'off'}`} onClick={() => setGreenLeds(prev => ({ ...prev, petkus2On: !prev.petkus2On }))} />
                <span className="alarm-text">Петкус №2 (включен)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led green-led ${greenLeds.dryingVent ? 'on' : 'off'}`} onClick={() => setGreenLeds(prev => ({ ...prev, dryingVent: !prev.dryingVent }))} />
                <span className="alarm-text">Задвижка №1 (открыта)</span>
              </div>
            </div>
            
            <div className="alarm-center-image">
              <img src="/src/assets/Union (3).png" alt="Union" />
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.bunkerHigh ? 'on' : 'off'}`} onClick={() => setRedLeds(prev => ({ ...prev, bunkerHigh: !prev.bunkerHigh }))} />
                <span className="alarm-text">Бункер верхний уровень</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.gateClosed ? 'on' : 'off'}`} onClick={() => setRedLeds(prev => ({ ...prev, gateClosed: !prev.gateClosed }))} />
                <span className="alarm-text">Перекидной клапан (закрыт)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.transport2Alarm ? 'on' : 'off'}`} onClick={() => setRedLeds(prev => ({ ...prev, transport2Alarm: !prev.transport2Alarm }))} />
                <span className="alarm-text">Транспорт №2 (авария)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.transport1Alarm ? 'on' : 'off'}`} onClick={() => setRedLeds(prev => ({ ...prev, transport1Alarm: !prev.transport1Alarm }))} />
                <span className="alarm-text">Транспорт №1 (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.noria1Alarm ? 'on' : 'off'}`} onClick={() => setRedLeds(prev => ({ ...prev, noria1Alarm: !prev.noria1Alarm }))} />
                <span className="alarm-text">Нория №1 (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.gate1Alarm ? 'on' : 'off'}`} onClick={() => setRedLeds(prev => ({ ...prev, gate1Alarm: !prev.gate1Alarm }))} />
                <span className="alarm-text">Задвижка №1 (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.gate2Alarm ? 'on' : 'off'}`} onClick={() => setRedLeds(prev => ({ ...prev, gate2Alarm: !prev.gate2Alarm }))} />
                <span className="alarm-text">Задвижка №2 (авария)</span>
              </div>
            </div>
            
            <div className="alarm-row">
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.tempAlarm ? 'on' : 'off'}`} onClick={() => setRedLeds(prev => ({ ...prev, tempAlarm: !prev.tempAlarm }))} />
                <span className="alarm-text">Температура (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.noria2Alarm ? 'on' : 'off'}`} onClick={() => setRedLeds(prev => ({ ...prev, noria2Alarm: !prev.noria2Alarm }))} />
                <span className="alarm-text">Нория №2 (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.humidityAlarm ? 'on' : 'off'}`} onClick={() => setRedLeds(prev => ({ ...prev, humidityAlarm: !prev.humidityAlarm }))} />
                <span className="alarm-text">Влажность (авария)</span>
              </div>
              <div className="alarm-item">
                <div className={`alarm-led red-led ${redLeds.selfWarming ? 'on' : 'off'}`} onClick={() => setRedLeds(prev => ({ ...prev, selfWarming: !prev.selfWarming }))} />
                <span className="alarm-text">Самосогревание</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Правый нижний блок */}
        <div className="bottom-block bottom-block-right">
          <div className="bottom-block-title">
            ЖУРНАЛ<br />
            СОБЫТИЙ
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

export default TransportControlPage;