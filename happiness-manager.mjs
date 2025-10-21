// happiness-manager.mjs
import { readdir, readFile, writeFile, stat } from 'fs/promises'
import { join } from 'path'

const [,, guestDir, outputFile] = process.argv

// Пропорции на количество VIP-гостей
const DRINK_RATIOS = {
  'iced-tea': { key: 'iced-tea-bottles', per: 6 },
  'sparkling-water': { key: 'sparkling-water-bottles', per: 4 },
  'water': { key: 'water-bottles', per: 4 },
  'soft': { key: 'soft-bottles', per: 4 },
}

const FOOD_KEYS = {
  carnivore: guest => ({ burgers: guest }),
  fish: guest => ({ sardines: guest }),
  everything: guest => ({ kebabs: guest }),
  veggie: () => ({
    eggplants: 1 / 3,
    courgettes: 1 / 3,
    mushrooms: 1,
    hummus: 1 / 3,
  }),
  vegan: () => ({
    eggplants: 1 / 3,
    courgettes: 1 / 3,
    mushrooms: 1,
    hummus: 1 / 3,
  }),
}

function ceil(value) {
  return Math.ceil(value)
}

function mergeObjects(objA, objB) {
  const res = { ...objA }
  for (const [k, v] of Object.entries(objB)) {
    res[k] = v
  }
  return res
}

async function main() {
  let files
  try {
    files = await readdir(guestDir)
  } catch {
    console.log('No one is coming.')
    return
  }

  const guests = []

  for (const file of files) {
    try {
      const content = await readFile(join(guestDir, file), 'utf8')
      guests.push(JSON.parse(content))
    } catch {}
  }

  const vip = guests.filter(g => g.answer === 'yes')

  if (vip.length === 0) {
    console.log('No one is coming.')
    return
  }

  const result = {}
  let veganCount = 0
  let carnivoreCount = 0
  let fishCount = 0
  let everythingCount = 0
  let veggieCount = 0

  let drinkCounts = {
    'iced-tea': 0,
    'sparkling-water': 0,
    'water': 0,
    'soft': 0,
  }

  for (const guest of vip) {
    // Food
    if (guest.food === 'vegan') veganCount++
    else if (guest.food === 'veggie') veggieCount++
    else if (guest.food === 'carnivore') carnivoreCount++
    else if (guest.food === 'fish') fishCount++
    else if (guest.food === 'everything') everythingCount++

    // Drinks
    if (DRINK_RATIOS[guest.drink]) {
      drinkCounts[guest.drink]++
    }
  }

  // 🥔 Potatoes for all VIPs
  result.potatoes = vip.length

  // 🍔 Carnivores
  if (carnivoreCount > 0) result.burgers = carnivoreCount

  // 🐟 Fish
  if (fishCount > 0) result.sardines = fishCount

  // 🍢 Omnivores
  if (everythingCount > 0) result.kebabs = everythingCount

  // 🥕 Veggie/Vegan shared
  const vegCount = veganCount + veggieCount
  if (vegCount > 0) {
    result.eggplants = ceil(vegCount / 3)
    result.courgettes = ceil(vegCount / 3)
    result.hummus = ceil(vegCount / 3)
    result.mushrooms = vegCount
  }

  // 🥤 Drinks
  for (const [type, count] of Object.entries(drinkCounts)) {
    if (count > 0) {
      result[DRINK_RATIOS[type].key] = ceil(count / DRINK_RATIOS[type].per)
    }
  }

  // Объединение с существующим файлом
  let final = {}
  try {
    const existing = await readFile(outputFile, 'utf8')
    final = JSON.parse(existing)
  } catch {
    // файл не существует — создадим с нуля
  }

  // Обновление значений
  for (const [key, val] of Object.entries(result)) {
    final[key] = val
  }

  await writeFile(outputFile, JSON.stringify(final, null, 2), 'utf8')
}

main()