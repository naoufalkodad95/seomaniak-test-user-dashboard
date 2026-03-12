import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [utilisateurAModifier, setUtilisateurAModifier] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const ajouterUtilisateur = (nouvelUtilisateur) => {
    setUtilisateurs([...utilisateurs, nouvelUtilisateur]);
  };

  const modifierUtilisateur = (utilisateurModifie) => {
    const nouveauxUtilisateurs = utilisateurs.map((utilisateur, index) => 
      index === utilisateurAModifier.index ? utilisateurModifie : utilisateur
    );
    setUtilisateurs(nouveauxUtilisateurs);
    setUtilisateurAModifier(null);
    setShowEditModal(false);
  };

  const supprimerUtilisateur = (index) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      const nouveauxUtilisateurs = utilisateurs.filter((_, i) => i !== index);
      setUtilisateurs(nouveauxUtilisateurs);
    }
  };

  const resetListe = () => {
    if (window.confirm('Voulez-vous vraiment supprimer tous les utilisateurs ?')) {
      setUtilisateurs([]);
    }
  };

  const handleEdit = (index) => {
    setUtilisateurAModifier({
      ...utilisateurs[index],
      index: index
    });
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setUtilisateurAModifier(null);
  };

  return (
    <div className="App">
      <Dashboard 
        utilisateurs={utilisateurs}
        onAjouterUtilisateur={ajouterUtilisateur}
        onSupprimerUtilisateur={supprimerUtilisateur}
        onResetListe={resetListe}
        onEdit={handleEdit}
        showEditModal={showEditModal}
        onCloseModal={handleCloseModal}
        utilisateurAModifier={utilisateurAModifier}
        onModifierUtilisateur={modifierUtilisateur}
      />
    </div>
  );
}

export default App;