import React from 'react';
import { withTranslation } from '../src/helpers/i18n';
import { connect } from 'react-redux';
import { searchPokemonName } from '../src/store/actions/search-area';
import Head from 'next/head';
import PokemonList from '../src/visual-components/pokemon-list';

class Search extends React.Component {
  componentWillUnmount() {
    this.props.dispatch(searchPokemonName(''));
  }

  render() {
    const { t, isLoading, data, error } = this.props;
    const title = t('Search');
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <PokemonList isLoading={isLoading} data={data} error={error} />
      </>
    );
  }
}

Search.getInitialProps = async function(context) {
  const { keyword } = context.query;
  const namespacesRequired = ['common'];
  await context.store.dispatch(searchPokemonName(keyword, true));
  return { namespacesRequired };
};

const mapStateToProps = state => ({
  isLoading: state.searchArea.isLoading,
  data: state.searchArea.data,
  error: state.searchArea.error
});

export default connect(mapStateToProps)(withTranslation()(Search));
