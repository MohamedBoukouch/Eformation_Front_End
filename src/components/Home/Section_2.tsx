import React from 'react'

const Section_2 : React.FC = ()=> {
  return (
    <section className="bg-white py-20 px-8 md:px-16 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900 md:text-3xl sm:text-2xl">
          Pourquoi choisir E-Formation ?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12 md:text-base sm:text-sm">
          Nous proposons une plateforme moderne et interactive qui vous aide à apprendre, évoluer et obtenir des certifications reconnues.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 md:text-lg">+500 formations</h3>
            <p className="text-gray-500 md:text-sm">Des cours adaptés à tous les niveaux.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 md:text-lg">Apprentissage rapide</h3>
            <p className="text-gray-500 md:text-sm">Progressez à votre rythme, sans contrainte.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3 md:text-lg">Certifications</h3>
            <p className="text-gray-500 md:text-sm">Valorisez vos compétences sur le marché du travail.</p>
          </div>
        </div>
      </section>
  )
}

export default Section_2
