import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import styled from 'styled-components'; 
import useSynthetixQueries from '@synthetixio/queries';

import useSelectedPriceCurrency from 'hooks/useSelectedPriceCurrency';

import { getExchangeRatesForCurrencies } from 'utils/currencies';
import { formatCurrency } from 'utils/formatters/number';

import UserInfo from '../UserInfo';
import { CurrencyKey, Synths } from 'constants/currency';
import MarketDetails from '../MarketDetails';
import TVChart from 'components/TVChart';
import FuturesPositionsTable from 'sections/dashboard/FuturesPositionsTable';

type MarketInfoProps = {
	market: string;
};

const MarketInfo: FC<MarketInfoProps> = ({ market }) => {
	const { t } = useTranslation();
	const { useExchangeRatesQuery } = useSynthetixQueries();
	const exchangeRatesQuery = useExchangeRatesQuery();

	const exchangeRates = exchangeRatesQuery.isSuccess ? exchangeRatesQuery.data ?? null : null;
	const { selectedPriceCurrency } = useSelectedPriceCurrency();
	const baseCurrencyKey = market as CurrencyKey;

	const basePriceRate = useMemo(
		() => getExchangeRatesForCurrencies(exchangeRates, baseCurrencyKey, selectedPriceCurrency.name),
		[exchangeRates, baseCurrencyKey, selectedPriceCurrency]
	);

	return (
		<Container>
			<Head>
				<title>
					{basePriceRate
						? t('futures.market.page-title-rate', {
								baseCurrencyKey,
								rate: formatCurrency(selectedPriceCurrency.name, basePriceRate, {
									currencyKey: selectedPriceCurrency.name,
								}),
						  })
						: t('futures.market.page-title')}
				</title>
			</Head>
			<MarketDetails baseCurrencyKey={baseCurrencyKey} />
			<TVChart baseCurrencyKey={baseCurrencyKey} quoteCurrencyKey={Synths.sUSD} />
			<UserInfo marketAsset={baseCurrencyKey} />
			
			<TabButtonsContainer>
				{POSITIONS_TABS.map(({ name, label, badge, active, disabled, onClick }) => (
					<TabButton
						key={name}
						title={label}
						badge={badge}
						active={active}
						disabled={disabled}
						onClick={onClick}
					/>
				))}
			</TabButtonsContainer>
			<TabPanel name={PositionsTab.FUTURES} activeTab={activePositionsTab}>
				<FuturesPositionsTable
					futuresMarkets={futuresMarkets}
				/>
			</TabPanel>

			<TabPanel name={PositionsTab.SHORTS} activeTab={activePositionsTab}></TabPanel>

			<TabPanel name={PositionsTab.SPOT} activeTab={activePositionsTab}></TabPanel>

		</Container>
	);
};

const Container = styled.div`
	padding-bottom: 48px;
`

export default MarketInfo;
