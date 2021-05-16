export default async (context, locale) => {
    return await Promise.resolve({
        SearchForAny: 'Search for any article ...',
        SearchForAnyExample: 'e.g. Alexander the Great',
        ListenTheArticle: 'Listen the article',
        PlayTheEntire: 'Play the entire article',
        PlayTheSection: 'Play the section'
    })
}