# 🎰 スロットマシンゲーム 仕様書

## 📋 プロジェクト概要

### 基本情報
- **プロジェクト名**: Slot Machine Game
- **バージョン**: v1.0.0
- **作成日**: 2025年6月30日
- **技術スタック**: React 18+ / Next.js 15.3.4 / TypeScript / Tailwind CSS
- **デプロイ**: Vercel
- **リポジトリ**: https://github.com/iidaatcnt/slot-machine-game

### プロジェクト目的
ブラウザで動作するシンプルで楽しいスロットマシンゲームの開発。レスポンシブデザインでモバイル・デスクトップ両対応。

## 🎮 ゲーム仕様

### 基本ルール
1. **初期コイン**: 100枚
2. **ベット額**: 10コイン固定
3. **リール数**: 3つ
4. **シンボル種類**: 6種類（🍒🍋🍊🍇⭐💎）

### 勝利条件と配当
| 組み合わせ | 倍率 | 配当額 |
|-----------|------|--------|
| 🍒🍒🍒 | ×3 | 30コイン |
| 🍋🍋🍋 | ×4 | 40コイン |
| 🍊🍊🍊 | ×5 | 50コイン |
| 🍇🍇🍇 | ×6 | 60コイン |
| ⭐⭐⭐ | ×15 | 150コイン |
| 💎💎💎 | ×25 | 250コイン |
| 2つ揃い | ×1 | 10コイン（元返し） |

### ゲーム進行
1. **スピンボタン**クリックで10コイン消費
2. **2秒間**のスピンアニメーション
3. **勝利判定**実行
4. **配当**があれば自動的にコイン追加
5. **コイン不足**時はリセットボタン表示

## 🎨 UI/UX 仕様

### デザインシステム
- **カラーパレット**: 
  - 背景: Purple-Blue グラデーション
  - メイン: Yellow-Orange グラデーション
  - アクセント: Red (スピンボタン)、Green (勝利表示)
- **フォント**: システムフォント使用
- **レスポンシブ**: モバイルファースト設計

### コンポーネント構成
```
SlotMachine (メインコンポーネント)
├── Header (タイトル・コイン表示)
├── ReelContainer (リール表示エリア)
│   └── ReelBox × 3 (個別リール)
├── ControlPanel (操作ボタンエリア)
├── WinDisplay (勝利時表示)
├── PayTable (配当表)
└── ResetButton (リセットボタン)
```

### 状態管理
```typescript
// ゲーム状態
const [coins, setCoins] = useState<number>(100)
const [isSpinning, setIsSpinning] = useState<boolean>(false)
const [lastWin, setLastWin] = useState<number>(0)
const [totalSpins, setTotalSpins] = useState<number>(0)
const [reels, setReels] = useState<string[]>(['🍒', '🍋', '🍊'])
```

## 🛠️ 技術仕様

### ファイル構成
```
slot-machine-game/
├── app/
│   ├── page.tsx           # メインページ
│   ├── layout.tsx         # レイアウト設定
│   └── globals.css        # グローバルスタイル
├── components/
│   └── SlotMachine.tsx    # メインゲームコンポーネント
├── public/                # 静的ファイル
├── package.json           # 依存関係
├── tsconfig.json          # TypeScript設定
├── tailwind.config.js     # Tailwind設定
├── next.config.ts         # Next.js設定
└── README.md             # プロジェクト説明
```

### 主要な関数

#### `getRandomSymbol(): string`
```typescript
const getRandomSymbol = (): string => 
  symbols[Math.floor(Math.random() * symbols.length)]
```

#### `checkWin(newReels: string[]): number`
```typescript
const checkWin = (newReels: string[]): number => {
  // 3つ揃いチェック
  if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
    return winMultipliers[newReels[0]] * BET_AMOUNT
  }
  // 2つ揃いチェック
  if (newReels[0] === newReels[1] || newReels[1] === newReels[2] || newReels[0] === newReels[2]) {
    return BET_AMOUNT
  }
  return 0
}
```

#### `spin(): void`
```typescript
const spin = (): void => {
  // ベット処理 → アニメーション → 結果判定 → 配当処理
}
```

### アニメーション仕様
- **スピン中**: 🎲アイコンでbounceアニメーション
- **勝利時**: pulse + scale効果
- **ボタン**: hover時のscale効果
- **遷移時間**: 2秒間のスピンアニメーション

## 🚀 開発環境セットアップ

### 前提条件
- Node.js 18以上
- npm または yarn
- Git

### セットアップ手順
```bash
# リポジトリクローン
git clone https://github.com/iidaatcnt/slot-machine-game.git
cd slot-machine-game

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ブラウザでアクセス
open http://localhost:3000
```

### 依存関係
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0", 
    "next": "15.3.4"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.3.4"
  }
}
```

## 📦 ビルド・デプロイ

### ローカルビルド
```bash
# 本番ビルド
npm run build

# 本番サーバー起動
npm start
```

### Vercelデプロイ
1. GitHubリポジトリと連携
2. 自動デプロイ設定
3. TypeScript型チェック通過必須

### 型安全性
- 全ての関数に型注釈必須
- `strict: true` 設定
- ESLint設定済み

## 🔧 カスタマイズポイント

### ゲームバランス調整
```typescript
// ベット額変更
const BET_AMOUNT = 10  // 5, 20, 50など

// 配当倍率調整
const winMultipliers = {
  '🍒': 3,  // 2〜5に調整可能
  '🍋': 4,  // 3〜6に調整可能
  // ...
}

// 初期コイン数
const INITIAL_COINS = 100  // 50, 200, 500など
```

### シンボル変更
```typescript
const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎']
// 他の絵文字に変更可能: ['🎲', '🃏', '🎭', '🎪', '🎨', '🎵']
```

### アニメーション時間
```typescript
setTimeout(() => {
  // 結果表示
}, 2000)  // 1000〜5000msで調整可能
```

## 🚧 今後の拡張予定

### Phase 2: 機能拡張
- [ ] **オートプレイ機能**
  - 連続スピン設定
  - 停止条件設定（勝利時、損失額など）

- [ ] **ベット額変更**
  - 5, 10, 20, 50コイン選択可能
  - 配当もベット額に比例

- [ ] **ボーナスゲーム**
  - 特定条件でボーナスラウンド突入
  - フリースピン機能

### Phase 3: UI/UX改善
- [ ] **サウンド効果**
  - スピン音
  - 勝利音
  - BGM（オン/オフ切替）

- [ ] **エフェクト強化**
  - パーティクル効果
  - リール回転アニメーション
  - 大当たり演出

### Phase 4: データ管理
- [ ] **統計機能**
  - 勝率統計
  - 最高配当記録
  - プレイ履歴

- [ ] **セーブ機能**
  - LocalStorage活用
  - ゲーム状態保存

### Phase 5: マルチプレイヤー
- [ ] **ランキング機能**
- [ ] **リアルタイム対戦**
- [ ] **ソーシャル機能**

## 🐛 既知の問題・制限事項

### 現在の制限
- ベット額固定（10コインのみ）
- サウンド未実装
- オフライン時のデータ永続化なし
- SEO最適化未実装

### ブラウザ対応
- ✅ Chrome, Firefox, Safari最新版
- ✅ モバイルブラウザ
- ❌ IE11未対応

## 📚 参考資料

### 技術ドキュメント
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### デザイン参考
- [Real Slot Machine UX Patterns](https://uxplanet.org/casino-game-ux-design-patterns)
- [Game UI Design Best Practices](https://gameuidatabase.com)

## 🤝 コントリビューション

### 開発の流れ
1. **Issue作成** - 新機能・バグ報告
2. **ブランチ作成** - `feature/機能名` または `fix/バグ名`
3. **開発・テスト** - ローカルで動作確認
4. **プルリクエスト** - レビュー後マージ

### コーディング規約
- **TypeScript**: 型注釈必須
- **Component**: 関数コンポーネント使用
- **State**: useState hook使用
- **Style**: Tailwind CSS classes
- **Commit**: Conventional Commits形式

### テスト項目
- [ ] 基本ゲーム動作
- [ ] レスポンシブデザイン
- [ ] TypeScript型チェック
- [ ] ESLint通過
- [ ] ビルド成功

---

## 📞 Contact

**Project Maintainer**: @iidaatcnt  
**Repository**: https://github.com/iidaatcnt/slot-machine-game  
**Live Demo**: [Vercel URL]

---

*このドキュメントは開発の進行に合わせて随時更新されます。*