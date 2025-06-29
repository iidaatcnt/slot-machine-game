'use client'

import { useState } from 'react'

export default function SlotMachine() {
  const [coins, setCoins] = useState<number>(100)
  const [isSpinning, setIsSpinning] = useState<boolean>(false)
  const [lastWin, setLastWin] = useState<number>(0)
  const [totalSpins, setTotalSpins] = useState<number>(0)
  
  const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎'] as const
  const [reels, setReels] = useState<string[]>(['🍒', '🍋', '🍊'])
  
  const BET_AMOUNT = 10

  const getRandomSymbol = (): string => symbols[Math.floor(Math.random() * symbols.length)]

  const checkWin = (newReels: string[]): number => {
    if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
      const winMultipliers: { [key: string]: number } = {
        '🍒': 3, '🍋': 4, '🍊': 5, '🍇': 6, '⭐': 15, '💎': 25
      }
      return winMultipliers[newReels[0]] * BET_AMOUNT
    }
    // 2つ揃いでも小さな配当
    if (newReels[0] === newReels[1] || newReels[1] === newReels[2] || newReels[0] === newReels[2]) {
      return BET_AMOUNT // ベット額と同額返還
    }
    return 0
  }

  const spin = (): void => {
    if (isSpinning || coins < BET_AMOUNT) return
    
    setIsSpinning(true)
    setCoins(coins - BET_AMOUNT)
    setLastWin(0)
    setTotalSpins(prev => prev + 1)
    
    // スピンアニメーション（2秒間）
    setTimeout(() => {
      const newReels: string[] = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]
      setReels(newReels)
      
      const winAmount: number = checkWin(newReels)
      if (winAmount > 0) {
        setLastWin(winAmount)
        setCoins(prev => prev + winAmount)
      }
      
      setIsSpinning(false)
    }, 2000)
  }

  const resetGame = (): void => {
    setCoins(100)
    setLastWin(0)
    setTotalSpins(0)
    setReels(['🍒', '🍋', '🍊'])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl text-center font-bold text-white mb-6 drop-shadow-lg">
          🎰 スロットマシン 🎰
        </h1>
        
        <div className="text-center text-white mb-6 bg-black/20 rounded-lg p-4">
          <div className="text-2xl font-bold">コイン: {coins}</div>
          <div className="text-sm">ベット額: {BET_AMOUNT} | 回転数: {totalSpins}</div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <div className="flex justify-center space-x-4 mb-4">
            {reels.map((symbol, index) => (
              <div key={index} className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center text-4xl border-4 border-gray-600">
                {isSpinning ? (
                  <div className="animate-bounce text-3xl opacity-50">🎲</div>
                ) : (
                  symbol
                )}
              </div>
            ))}
          </div>
        </div>

        {lastWin > 0 && (
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-green-300 animate-pulse">
              🎉 WIN! +{lastWin} コイン 🎉
            </div>
          </div>
        )}

        <div className="text-center mb-6">
          <button 
            onClick={spin}
            disabled={isSpinning || coins < BET_AMOUNT}
            className={`px-8 py-4 rounded-full text-xl font-bold transition-all duration-200 transform ${
              isSpinning || coins < BET_AMOUNT 
                ? 'bg-gray-400 cursor-not-allowed text-gray-700' 
                : 'bg-red-500 hover:bg-red-600 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {isSpinning ? '回転中...' : coins < BET_AMOUNT ? 'コイン不足' : 'SPIN!'}
          </button>
        </div>

        {coins < BET_AMOUNT && (
          <div className="text-center mb-4">
            <button 
              onClick={resetGame}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold"
            >
              🔄 リセット
            </button>
          </div>
        )}

        <div className="text-center text-white text-sm bg-black/20 rounded-lg p-3">
          <div className="font-bold mb-2">配当表</div>
          <div className="text-xs">
            <div>🍒🍒🍒 ×3 | 🍋🍋🍋 ×4 | 🍊🍊🍊 ×5</div>
            <div>🍇🍇🍇 ×6 | ⭐⭐⭐ ×15 | 💎💎💎 ×25</div>
            <div className="mt-1 text-yellow-300">2つ揃い: ×1（元返し）</div>
          </div>
        </div>
      </div>
    </div>
  )
}