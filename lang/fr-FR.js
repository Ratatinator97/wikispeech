export default async (context, locale) => {
    return await Promise.resolve({
        SearchForAny: 'Cherchez un article Wikipedia ...',
        SearchForAnyExample: 'i.e. Alexandre le grand',
        ListenTheArticle: 'Ecouter l\'article',
        PlayTheEntire: 'Jouer l\'article en entier',
        PlayTheSection: 'Jouer la section'
    })
}