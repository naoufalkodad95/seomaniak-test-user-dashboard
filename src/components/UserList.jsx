import React from 'react';

function UserList({ utilisateurs, onSupprimerUtilisateur, onEdit }) {

  if (utilisateurs.length === 0) {
    return (
      <div className="empty-state">
        <i className="bi bi-people"></i>
        <h5>Aucun utilisateur</h5>
        <p>Commencez par ajouter des utilisateurs avec le formulaire</p>
      </div>
    );
  }

  return (
    <div>
      {utilisateurs.map((utilisateur, index) => (
        <div key={index} className="user-card">
          <div className="d-flex align-items-start">
            <div className="user-avatar me-3">
              <i className={`bi ${
                utilisateur.sexe === 'Homme' ? 'bi-gender-male' :
                utilisateur.sexe === 'Femme' ? 'bi-gender-female' : 'bi-gender-trans'
              }`}></i>
            </div>
            
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6>{utilisateur.nom} {utilisateur.prenom}</h6>
                  <small className="text-secondary">
                    <i className="bi bi-calendar3 me-1"></i>
                    {utilisateur.date}
                  </small>
                </div>
                <div>
                  <button 
                    className="action-btn edit"
                    onClick={() => onEdit(index)}
                    data-tooltip="Modifier"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => onSupprimerUtilisateur(index)}
                    data-tooltip="Supprimer"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>

              <div className="mb-2">
                <span className={`badge-custom ${
                  utilisateur.sexe === 'Homme' ? 'badge-primary' :
                  utilisateur.sexe === 'Femme' ? 'badge-danger' : 'badge-info'
                }`}>
                  <i className={`bi me-1 ${
                    utilisateur.sexe === 'Homme' ? 'bi-gender-male' :
                    utilisateur.sexe === 'Femme' ? 'bi-gender-female' : 'bi-gender-trans'
                  }`}></i>
                  {utilisateur.sexe}
                </span>
                
                <span className="badge-custom badge-success">
                  <i className="bi bi-mortarboard me-1"></i>
                  {utilisateur.niveauEtudes}
                </span>
              </div>

              <div className="mb-2">
                {utilisateur.langues.map((langue) => (
                  <span key={langue} className="badge-custom badge-light">
                    {langue === 'Français' && '🇫🇷 '}
                    {langue === 'Anglais' && '🇬🇧 '}
                    {langue === 'Espagnol' && '🇪🇸 '}
                    {langue === 'Allemand' && '🇩🇪 '}
                    {langue === 'Italien' && '🇮🇹 '}
                    {langue === 'Arabe' && '🇸🇦 '}
                    {langue === 'Chinois' && '🇨🇳 '}
                    {langue === 'Japonais' && '🇯🇵 '}
                    {langue}
                  </span>
                ))}
              </div>

              <small className="text-secondary">
                <i className="bi bi-envelope me-1"></i>
                {utilisateur.email}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;