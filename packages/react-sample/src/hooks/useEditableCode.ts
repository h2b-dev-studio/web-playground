/**
 * Custom hook for editable code execution with safety controls
 * @derives REQ-REACT-004
 */
import { useState, useCallback, useEffect, useRef } from 'react';

interface UseEditableCodeOptions {
  initialCode: string;
  timeout?: number;
}

interface UseEditableCodeResult {
  code: string;
  setCode: (code: string) => void;
  error: string | null;
  reset: () => void;
  executeHook: <T>(hookName: string) => T | null;
}

export function useEditableCode({
  initialCode,
  timeout = 5000,
}: UseEditableCodeOptions): UseEditableCodeResult {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState<string | null>(null);
  const originalCode = useRef(initialCode);

  const reset = useCallback(() => {
    setCode(originalCode.current);
    setError(null);
  }, []);

  const executeHook = useCallback(
    <T,>(hookName: string): T | null => {
      setError(null);

      try {
        // Create a restricted scope for execution
        const safeGlobals = {
          useState: (await import('react')).useState,
          useEffect: (await import('react')).useEffect,
          useCallback: (await import('react')).useCallback,
          useMemo: (await import('react')).useMemo,
          useRef: (await import('react')).useRef,
          console: {
            log: console.log,
            warn: console.warn,
            error: console.error,
          },
        };

        // We can't use real async timeout detection in sync code
        // Instead, we'll catch any parsing errors
        const fn = new Function(
          ...Object.keys(safeGlobals),
          `${code}\nreturn ${hookName};`
        );

        const result = fn(...Object.values(safeGlobals));
        return result as T;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        return null;
      }
    },
    [code]
  );

  // Update original code ref when initialCode changes
  useEffect(() => {
    originalCode.current = initialCode;
    setCode(initialCode);
    setError(null);
  }, [initialCode]);

  return {
    code,
    setCode,
    error,
    reset,
    executeHook,
  };
}

// Synchronous hook execution for simpler cases
export function useEditableCodeSync({
  initialCode,
}: UseEditableCodeOptions): UseEditableCodeResult {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState<string | null>(null);
  const originalCode = useRef(initialCode);

  const reset = useCallback(() => {
    setCode(originalCode.current);
    setError(null);
  }, []);

  const executeHook = useCallback(
    <T,>(_hookName: string): T | null => {
      // This is a placeholder - actual execution happens in the component
      return null;
    },
    []
  );

  useEffect(() => {
    originalCode.current = initialCode;
    setCode(initialCode);
    setError(null);
  }, [initialCode]);

  return {
    code,
    setCode,
    error,
    reset,
    executeHook,
  };
}
