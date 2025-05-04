import { useCallback, useEffect, useState } from 'react';
import { fetchVotes } from '../../graphql/fetchVotes';
import { castVote } from '../../graphql/castVote';
import { changeVote } from '../../graphql/changeVote';
import { withdrawVote } from '../../graphql/withdrawVote';
import { usePersonId } from '../../hooks/usePersonId';
import type { VoteSummary } from '../../graphql/fetchVotes';

export function VoteManager() {
  const personId = usePersonId();
  const [votes, setVotes] = useState<VoteSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVotes = useCallback(async () => {
    if (personId) {
      const data = await fetchVotes(personId);
      console.log('data', data);
      setVotes(data);
    }
  }, [personId]);

  useEffect(() => {
    loadVotes().finally(() => setLoading(false));
  }, [loadVotes, personId]);

  const handleVote = async (voteType: 'up' | 'down', item: VoteSummary) => {
    if (item.isObserver) return;

    const action = item.hasUserVoted ? changeVote : castVote;
    const success = await action({
      crowdsourcedResearchId: item.id,
      personId: personId!,
      voteType,
    });

    if (success === 0) loadVotes();
    else alert('Vote failed');
  };

  const handleWithdraw = async (item: VoteSummary) => {
    const success = await withdrawVote({
      crowdsourcedResearchId: item.id,
      personId: personId!,
    });

    if (success === 0) loadVotes();
    else alert('Withdraw failed');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <h2>Vote on Crowdsourced Research</h2>
      {loading ? (
        <p>Loading votes...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Type</th>
              <th>Parent Company</th>
              <th>Observer</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {votes.map((item) => (
              <tr key={item.id}>
                <td>{item.companyName}</td>
                <td>{item.ownershipTypeDescription}</td>
                <td>{item.parentCompanyName || '—'}</td>
                <td>{item.observer}</td>
                <td>{item.notes || ''}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginRight: '0.75rem',
                        opacity: item.isObserver ? 0.4 : 1,
                        pointerEvents: item.isObserver ? 'none' : 'auto',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '0.1rem',
                        }}
                      >
                        <button
                          onClick={() => handleVote('up', item)}
                          style={{
                            color: 'green',
                            fontSize: '1.2rem',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                          }}
                          title="Vote Up"
                        >
                          ▲
                        </button>
                        <span
                          style={{
                            marginLeft: '0.25rem',
                            fontSize: '0.9rem',
                            color: '#ccc',
                          }}
                        >
                          {item.upCount}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                          onClick={() => handleVote('down', item)}
                          style={{
                            color: '#d38b5d',
                            fontSize: '1.2rem',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                          }}
                          title="Vote Down"
                        >
                          ▼
                        </button>
                        <span
                          style={{
                            marginLeft: '0.25rem',
                            fontSize: '0.9rem',
                            color: '#ccc',
                          }}
                        >
                          {item.downCount}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleWithdraw(item)}
                      style={{
                        fontSize: '1.2rem',
                        color: '#666',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                      title="Withdraw Vote"
                      disabled={item.isObserver || !item.hasUserVoted}
                    >
                      ❌
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
