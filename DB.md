# описание БД

## сущности

* Пользователь-Игрок
* Карта
* Рынок
* Бой

## Формализация сущностей

### Общеигровые таблицы

** таблица hashes **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| chat_hash | string | - |
| map_hash | string | - |

** таблица game **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| boost | integer | значение превосходства одного элемента над другим |
| nerf | integer | значение превосходства одного элемента над другим |
| attack_upgrade | integer | - |
| ... | ... | ... |

### Пользователь-Игрок

** таблица users **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| name | string | - |
| login | string | unique |
| password | string | - |
| token | string | - |
| money | integer | - |
| rating | integer | - |
| x | integer | - |
| y | integer | - |
| status | string | [ fight, scout, offline ], можно добавить ещё, не конечный список |


** Таблица monsters **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| name | string | - |
| element | integer | - |
| hp | integer | - |
| attack | integer | - |
| defense | integer | - |

** Таблица elements **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| name | string | - |
| boost_id | integer | - |
| nerf_id | integer | - |

** Таблица monster_types **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| name | string | - |
| element | integer | - |
| hp | integer | - |
| attack | integer | - |
| defense | integer | - |


** Таблица monsters **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| user_id | string | - |
| monster_type_id | integer | - |
| level | integer | 1 |
| hp | integer | - |
| status | string | [ 'in pocket', 'in team'] |

### Карта

** таблица map **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| name | string | - |
| width | integer | - |
| height | integer | - |
| image | string | картинка карты |

** таблица map_zones **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| map_id | integer | - |
| name | string | - |
| x | integer | - |
| y | integer | - |
| width | integer | - |
| height | integer | - |
| type | string | [ 'town', 'safe', 'dungeon'] |
| element_id | integer | - |

### Рынок

** таблица inventory **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| user_id | integer | - |
| resource | integer | кол-во ресурса |
| resource_type | string | 'crystals', 'eggs', 'egg fragments' |
| element_id | integer | - |

** таблица market **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| seller_id | integer | - |
| inventory_id | integer | - |
| datetime | datetime | - |
| start_price | integer | стартовая цена |
| cost_step | integer | минимальный шаг ставки |
| current_cost | integer | текущая цена |
| buyer_id | integer | текущий покупатель с самой высокой ставкой |
| timestamp_cost | datetime | время создания текущей ставки |
| status | string | [ 'open', 'sell', 'cancel'] |

### Бой

** таблица fight **
| название | Тип | Комментарий |
| - | - | - |
| id | integer | РК |
| user_id1 | integer | - |
| user_id2 | integer | 1, 2 |
| turn | integer | - |
| status | string | [ 'open', 'close'] |
| result | integer | 1, 2, null |
