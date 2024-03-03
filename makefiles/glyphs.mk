VENV_PATH = ./scripts/venv
VENV = . $(VENV_PATH)/bin/activate;

.PHONY: python/requirements
setup-glyphs:
	rm -rf "$(VENV_PATH)"
	python -m venv "$(VENV_PATH)"
	$(VENV) pip install --disable-pip-version-check -r requirements.txt

glyphs:
	$(VENV) python scripts/generate-glyphs.py
