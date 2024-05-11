import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'; // Import screen
import AudioPlayer from './index';

describe('AudioPlayer component', () => {
  // Mock props for testing
  const mockCurrentTrack = {
    name: 'Test Song',
    album: {
      artists: [{ name: 'Test Artist' }],
      images: [{ url: 'https://example.com/image.jpg' }]
    },
    preview_url: 'https://example.com/test.mp3'
  };

  const mockTotal = [
    { track: { preview_url: 'https://example.com/test1.mp3' } },
    { track: { preview_url: 'https://example.com/test2.mp3' } }
  ];

  it('renders without crashing', () => {
    render(<AudioPlayer currentTrack={mockCurrentTrack} total={mockTotal} currentIndex={0} setCurrentIndex={() => {}} />);
  });

  it('displays song title and artist correctly', () => {
    render(<AudioPlayer currentTrack={mockCurrentTrack} total={mockTotal} currentIndex={0} setCurrentIndex={() => {}} />);
    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('displays duration correctly', () => {
    render(<AudioPlayer currentTrack={mockCurrentTrack} total={mockTotal} currentIndex={0} setCurrentIndex={() => {}} />);
    expect(screen.getByText('0:00')).toBeInTheDocument(); // Assuming initial trackProgress is 0
    expect(screen.getByText('0:30')).toBeInTheDocument(); // Assuming the track duration is 30 seconds
  });

  it('handles play/pause correctly', () => {
    render(<AudioPlayer currentTrack={mockCurrentTrack} total={mockTotal} currentIndex={0} setCurrentIndex={() => {}} />);
    const playButton = screen.getByTestId('play-button');
    
    // Initially, the play button should have the 'play' class
    expect(playButton).toHaveClass('play-pause-btn flex');
  
    // Clicking the play button should toggle the class and isPlaying state
    fireEvent.click(playButton);
    expect(playButton).toHaveClass('play-pause-btn flex active'); // 'active' class should be applied when playing
  
    // Clicking the play button again should toggle the class and isPlaying state back
    fireEvent.click(playButton);
    expect(playButton).not.toHaveClass('active'); // 'active' class should be removed
  });
  
  it('handles skipping to the next song correctly', () => {
    const setCurrentIndexMock = jest.fn();
    render(<AudioPlayer currentTrack={mockCurrentTrack} total={mockTotal} currentIndex={1} setCurrentIndex={setCurrentIndexMock} />);
    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);
    expect(setCurrentIndexMock).toHaveBeenCalledWith(0); // Assuming clicking next button updates currentIndex to 0 (looping from last to first)
  });

  it('handles skipping to the previous song correctly', () => {
    const setCurrentIndexMock = jest.fn();
    render(<AudioPlayer currentTrack={mockCurrentTrack} total={mockTotal} currentIndex={0} setCurrentIndex={setCurrentIndexMock} />);
    const prevButton = screen.getByTestId('prev-button');
    fireEvent.click(prevButton);
    expect(setCurrentIndexMock).toHaveBeenCalledWith(1); // Assuming clicking previous button updates currentIndex to 1 (looping from first to last)
  });

  it('handles skipping to the next song when at the last song in the playlist', () => {
    const setCurrentIndexMock = jest.fn();
    render(<AudioPlayer currentTrack={mockCurrentTrack} total={mockTotal} currentIndex={mockTotal.length - 1} setCurrentIndex={setCurrentIndexMock} />);
    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);
    expect(setCurrentIndexMock).toHaveBeenCalledWith(0); // Assuming clicking next button from last song loops back to the first song
  });

  it('handles skipping to the previous song when at the first song in the playlist', () => {
    const setCurrentIndexMock = jest.fn();
    render(<AudioPlayer currentTrack={mockCurrentTrack} total={mockTotal} currentIndex={0} setCurrentIndex={setCurrentIndexMock} />);
    const prevButton = screen.getByTestId('prev-button');
    fireEvent.click(prevButton);
    expect(setCurrentIndexMock).toHaveBeenCalledWith(mockTotal.length - 1); // Assuming clicking previous button from first song loops back to the last song
  });
});
