import { CurrencyCategory, NetworkIdByName, Synth } from '@synthetixio/contracts-interface';
import { Language } from 'translations/constants';

import { languageStateKey, priceCurrencyStateKey } from 'store/app/constants';
import { weiFromEth } from 'utils/formatters/number';
import localStore from 'utils/localStore';

// app defaults
export const DEFAULT_LANGUAGE: Language = localStore.get(languageStateKey) ?? Language.EN;
export const DEFAULT_PRICE_CURRENCY: Synth = localStore.get(priceCurrencyStateKey) ?? {
	name: 'sUSD',
	asset: 'USD',
	sign: '$',
	category: 'crypto' as CurrencyCategory,
	description: '',
};

// network defaults
export const DEFAULT_NETWORK_ID = NetworkIdByName['mainnet-ovm'];

export const DEFAULT_GAS_BUFFER = 5000;
export const DEFAULT_GAS_LIMIT = 500000;
export const DEFAULT_CROSSMARGIN_GAS_BUFFER_PCT = 5;

// ui defaults
export const DEFAULT_SEARCH_DEBOUNCE_MS = 300;
export const DEFAULT_REQUEST_REFRESH_INTERVAL = 30000; // 30s
export const DEFAULT_CRYPTO_DECIMALS = 4;
export const DEFAULT_FIAT_DECIMALS = 2;
export const DEFAULT_NUMBER_DECIMALS = 2;
export const DEFAULT_PERCENT_DECIMALS = 2;
export const DEFAULT_TOKEN_DECIMALS = 18;

// for DEX aggregators like 1inch
export const DEFAULT_SLIPPAGE = 1;
export const DEFAULT_1INCH_SLIPPAGE = 3;

// for Trading History
export const DEFAULT_NUMBER_OF_TRADES: number = 16;
export const MAX_TIMESTAMP: number = 8640000000000000;

// for Fee History
export const DEFAULT_NUMBER_OF_FUTURES_FEE: number = 9999;

// leverage adjustment
export const DEFAULT_NP_LEVERAGE_ADJUSTMENT: number = 1;

// for mobile leaderboard
export const DEFAULT_LEADERBOARD_ROWS = 20;

// for perps v2
export const DEFAULT_PRICE_IMPACT_DELTA = weiFromEth(0.5).toString();
export const DEFAULT_DELAYED_EXECUTION_BUFFER = 0;

export const CROSS_MARGIN_ENABLED = false;

export const DEFAULT_FUTURES_MARGIN_TYPE = CROSS_MARGIN_ENABLED
	? 'cross_margin'
	: 'isolated_margin';

export const DEFAULT_LEVERAGE = '1';
