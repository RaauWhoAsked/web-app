import { defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';

interface GameType {
  loopActive: boolean;
  item: number;
  cash: number;
  itemsGain: {
    value: number;
    rate: number;
    costRate: number;
    costClick: number;
  };
  itemsSpeed: {
    value: number;
    cost: number;
  };
  btc: {
    value: number;
    cost: number;
  };
  store: {
    value: number;
    price: number;
  };
}

export const useGameStore = defineStore('game', () => {
  const game = ref<GameType>({
    loopActive: false,
    item: 0,
    cash: 100000,
    itemsGain: {
      // value = how many i get per click
      value: 1,
      // rate = how many i get per interval
      rate: 0,
      costRate: 100,
      costClick: 100,
    },
    itemsSpeed: {
      value: 10_000,
      cost: 1000,
    },
    btc: {
      value: 0,
      cost: 0,
    },
    store: {
      value: 0,
      price: 0,
    },
  });

  function incrementKongStrong() {
    game.value.item += game.value.itemsGain.value;
  }

  function sellKongStrongs() {
    if (game.value.store.value > game.value.item) return;
    game.value.item -= game.value.store.value;

    game.value.cash += game.value.store.value * game.value.store.price;
  }

  function convertBTC() {
    if (game.value.cash === 0) return;
    console.log(game.value.btc.cost);

    game.value.btc.value += game.value.cash / game.value.btc.cost;
    game.value.cash -= game.value.cash;
  }

  function setStoreValue(price: number, value: number) {
    game.value.store.value = value;
    game.value.store.price = price;
  }

  function gainItemsGainRate() {
    if (game.value.itemsGain.costRate > game.value.cash) return;
    game.value.itemsGain.rate += 1;
    game.value.cash -= game.value.itemsGain.costRate;
    if (game.value.loopActive === false) {
      loop();
    }
  }

  function gainItemsSpeedValue() {
    if (game.value.itemsSpeed.cost > game.value.cash) return;
    if (game.value.loopActive === false) {
      loop();
    }
    game.value.itemsSpeed.value *= 0.8;
    game.value.cash -= game.value.itemsSpeed.cost;
  }

  function itemsGainValue() {
    if (game.value.itemsGain.costClick > game.value.cash) return;
    game.value.itemsGain.value += 1;
    game.value.cash -= game.value.itemsGain.costClick;
  }

  function loop() {
    if (game.value.itemsGain.rate === 0) return;
    if (game.value.loopActive === false) {
      game.value.loopActive = true;
    }

    setTimeout(() => {
      loop();

      let gains = parseFloat(
        (
          (game.value.itemsGain.rate / game.value.itemsSpeed.value) *
          1000
        ).toFixed(2)
      );

      console.log(gains);

      game.value.item = parseFloat((game.value.item + gains).toFixed(2));
    }, 1000);
  }

  return {
    game,
    incrementKongStrong,
    sellKongStrongs,
    convertBTC,
    setStoreValue,
    gainItemsGainRate,
    gainItemsSpeedValue,
    itemsGainValue,
    loop,
  };
});
