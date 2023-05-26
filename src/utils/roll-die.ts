import { DieType, dieTypes } from "@/components/die"

export const rollDie = (type: DieType) => {
  return Math.floor(Math.random() * dieTypes[type]) + 1
}