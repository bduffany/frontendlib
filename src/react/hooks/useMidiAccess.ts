import { useEffect, useState } from 'react';

/**
 * Hook that wraps `navigator.requestMIDIAccess()` for use in React components.
 */
// NOTE: Depends on @types/webmidi
export function useMidiAccess() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [midi, setMidi] = useState<WebMidi.MIDIAccess | null>(null);

  useEffect(() => {
    navigator
      .requestMIDIAccess()
      .then((midi) => {
        setMidi(midi);
        midi.addEventListener('statechange', (event) =>
          setMidi(event.target as WebMidi.MIDIAccess)
        );
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [setMidi]);

  return { loading, error, midi };
}
