# Описание БД

## Сущности

* Пользователь-Игрок
* Карта
* Рынок
* Бой 

## Формолизация сущностей

### общеигровые таблицы

**Таблица hashes**

| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| chat_hash | string |  |

**Таблица game**

| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| map_id | integer | 1 |
| attack_upgrade | integer |  |
| defense_upgrade | integer |  |
| hp_upgrade | integer |  |

### Пользователь-Игрок

**Таблица User**

| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| name | string |  |
| login | string | unique |
| password | string |  |
| token | string |  |
| money | integer | |
| rating | | |
| x | integer | |
| y | integer | |
| status | string | fight, scout, offline, ...  |

**Таблица elements** (стихии)
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| name | string |  |
| boost_id| | |
| nerf_id |  | |

**Таблица monsters_types**

| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| name | string | |
| hp | integer | |
| attack | | |
|elements_id | | |


**Таблица monsters**

| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| name | string |  |
| user_id | integer | |
| mosters_type_id | integer | |
| level | integer| |
| hp | ineger | |
| status | string | "in pocket", "in team" |

**Таблица monsters_level**

| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| level | string | |
| hp | integer |  прибавка к здоровью |
| attack | integer | прибавка к урону|


### Карта

**Таблица map**

| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| name | string | |
| width | integer | |
| height | integer | |
| image | string| |


**Таблица map_zones**

| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| map_id | integer |  |
| x | integer| |
| y | integer| |
| name | string | |
| width | integer | |
| height | integer | |
| type | string| 'town', 'safe', 'dungeon', |
| element_id | integer| can be NULL |
| image | string| |


### Рынок

**Таблица inventory**

| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| user_id | integer | |
| resoure | integer | количество ресурса|
| resoure_type | string | кристаллы, яйца, осколки |
| element_id | integer| |


**Таблица lots**

| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| seller_id | integer | | Ссылка, на пользователя который продает
| inventory_id | integer | |
| datatime | datatime | |
| start_cost |integer | стартовая цена |
| step-cost | integer | минимальный шаг ставки |
| current_cost | integer| текущая цена |
| timestamp_cost | integer| время создание текущей цены |
| buyer_id | integer | текущий покупатель с самой высокой текущей ставкой |
| status | string | 'open', 'sell', 'cancel'|

### Бой 

**Таблица fight**

| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| user1_id | integer | |
| user2_id | integer | |
| turn | integer | 1, 2 | (кто атакует)
| status | string | 'open', 'close'| необходим для того, ?
| result | integer | 1, 2, null | (кто победил)