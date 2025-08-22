//Traduce a frances
export const RESULT_CONFIG = {
    excelente: {
        image: '../../assets/images/ends/excelente.png',
        badge: 'Score maximum',         
        badgeColor: { bg: 'bg-emerald-900/40', border: 'border-emerald-700', text: 'text-emerald-300' },
        title: 'Le Prophète Anonyme',
        summary: 'Vous êtes la voix que tout le monde écoute et dont les prophéties se réalisent, mais personne ne connaît votre identité. Vous devenez une légende et votre influence est immense.'
    },
    bien: {
        image: '../../assets/images/ends/bueno.png',
        badge: 'Bon travail',
        badgeColor: { bg: 'bg-cyan-900/40', border: 'border-cyan-700', text: 'text-cyan-300' },
        title: 'Le Midas des Lettres',
        summary: 'Vous êtes un atout très précieux et secret pour l\'écriture fantôme, vous transformez les mots en or. Un avenir prospère vous attend.'
        },
    regular: {
        image: '../../assets/images/ends/aceptable.png',
        badgeColor: { bg: 'bg-amber-900/40', border: 'border-amber-700', text: 'text-amber-300' },
        badge: 'Régulier',
        title: 'Écrivain Suffisant',
        summary: 'Vous continuez à écrire, mais vous n\'êtes pas le meilleur. Votre travail est acceptable, mais vous ne brillez pas. Vous devrez vous efforcer davantage pour vous démarquer.'
    },
    inaceptable: {
        image: '../../assets/images/ends/inaceptable.png',
        badgeColor: { bg: 'bg-rose-900/40', border: 'border-rose-700', text: 'text-rose-300' },
        badge: 'Vous n\'êtes pas fait pour ça...',
        title: 'Narratif Nul',
        summary: 'Vous avez échoué dans votre tentative d\'écriture. Voici une liste de métiers possibles auxquels vous pourriez vous consacrer : "Vendeur d\'aspirateurs", "Livreur de pizzas", "Serveur dans un bar de route"...'
    }
};
