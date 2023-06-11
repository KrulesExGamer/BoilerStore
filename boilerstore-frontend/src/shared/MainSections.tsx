import AppSection from '../components/AppSection';
import { faGamepad, faImage } from '@fortawesome/free-solid-svg-icons';


export const GameGenresSection = () => {
    return (
        <AppSection
            emoji='( ´◔ ω◔`) ノシ'
            emojiWeight='bold'
            emojiSize='2em'

            title='What kind of game you wanna make?'
            titleWeight='bold'
            titleSize='2em'

            moreIcon={faGamepad}
            morePage='/game-genres'
            moreText='More game genres...'

            searchQueryFormat='/search_genres?search_query=__PLACEHOLDER__'

            searchBarColor='red'
            shadowColors={['darkred', 'violet']}
            bgColors={['#db1f1f', '#eb3a84']}

            hasSearchBar={true}
        />
    );
};

export const AssetTypesSection = () => {
    return (
        <AppSection
            emoji='(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧'
            emojiWeight='bold'
            emojiSize='1em'

            title='Search by asset type!'
            titleWeight='bold'
            titleSize='1.2em'

            moreIcon={faImage}
            morePage='/asset-types'
            moreText='More game genres...'

            searchQueryFormat='/search_asset_types?search_query=__PLACEHOLDER__'

            searchBarColor='green'
            shadowColors={['darkred', 'violet']}
            bgColors={['#7F4F8F', 'green']}

            hasSearchBar={true}
        />
    );
};

export const ForYouSection = () => {
    return (
        <AppSection
            emoji='༼ つ ◕_◕ ༽つ'
            emojiWeight='bold'
            emojiSize='1.5em'

            title='Check this out!! ;)'
            titleWeight='bold'
            titleSize='1.8em'

            itemQueryFormat='/asset?asset=__PLACEHOLDER__'

            morePage='/results?spetial_tag=for-you'
            moreText='More assets...'

            searchBarColor='orange'
            shadowColors={['darkred', 'orange']}
            bgColors={['violet', 'orange']}
        />
    );
};


export const PopularThisWeekSection = () => {
    return (
        <AppSection
            emoji=';)'
            emojiWeight='bold'
            emojiSize='1.5em'

            title='Popular this week!!'
            titleWeight='bold'
            titleSize='1.8em'

            itemQueryFormat='/asset?asset=__PLACEHOLDER__'

            morePage='/results?spetial_tag=popular-this-week'
            moreText='More assets...'

            searchBarColor='orange'
            shadowColors={['darkred', 'orange']}
            bgColors={['violet', 'orange']}
        />
    );
};
